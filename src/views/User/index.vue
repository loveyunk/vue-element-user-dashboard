<template>
  <body-color color="#eff1f4">
    <div class="user-container">
      <UserFilter
        class="user-filter"
        :filter="$route.query"
        :on-filter-change="handleFilterChange"
        @add-item="addItem"
      />

      <UserList
        :loading="loading"
        :data-source="list"
        @on-delete-item="deleteItem"
        @on-edit-item="editItem"
      />

      <UserModal
        :type="modalType"
        :visible.sync="modalVisible"
        :item="currentItem"
        @on-ok="handleOk"
      />

      <el-pagination
        v-if="list.length"
        class="pagination-wrapper"
        v-bind="pagination"
        layout="total, sizes, prev, pager, next, jumper"
        background
        :page-sizes="[10, 20, 30, 40]"
        @current-change="handleCurrentPageChange"
        @size-change="handlePageSizeChange"
      />
    </div>
  </body-color>
</template>

<script>
import BodyColor from '@/components/BodyColor/index.vue';
import {
  queryUserList,
  removeUser,
  createUser,
  updateUser
} from '@/services/user';

import omitEmpty from 'omit-empty';
import UserList from './components/List.vue';
import UserModal from './components/Modal.vue';
import UserFilter from './components/Filter.vue';
import shallowEqual from '../../utils/shallowEqual';

const DEFAULT_PAGE_SIZE = 10;
const DEFAULT_CURRENT_PAGE = 1;

export default {
  components: {
    BodyColor,
    UserList,
    UserModal,
    UserFilter
  },

  data() {
    return {
      loading: false,
      list: [],
      currentItem: {},
      modalVisible: false,
      modalType: 'create',
      pagination: {
        total: null,
        currentPage: DEFAULT_CURRENT_PAGE,
        pageSize: DEFAULT_PAGE_SIZE
      }
    };
  },

  watch: {
    $route: {
      handler({ query }) {
        this.fetchUserList(query);
      },
      immediate: true
    }
  },

  methods: {
    /**
     * @param {Object} query
     * @param {string} query.name 姓名
     * @param {string} query.page 页码
     * @param {string} query.pageSize 每页显示条目个数
     */
    async fetchUserList(query = {}) {
      this.loading = true;
      const params = omitEmpty(query);
      const res = await queryUserList(params);
      this.list = Object.freeze(res.data);
      this.pagination.total = res.total;
      this.pagination.pageSize = Number(query.pageSize) || DEFAULT_PAGE_SIZE;
      this.pagination.currentPage = Number(query.page) || DEFAULT_CURRENT_PAGE;
      this.loading = false;
    },

    refreshList(newQuery = {}) {
      const query = { ...this.$route.query, ...newQuery };
      if (!shallowEqual(query, this.$route.query)) {
        this.$router.push({
          path: this.$route.path,
          query: {
            ...query
          }
        });
      } else {
        this.fetchUserList(query);
      }
    },

    async deleteItem(id) {
      this.loading = true;
      await removeUser(id);
      this.refreshList({
        page:
          this.list.length === 1 && this.pagination.currentPage > 1
            ? this.pagination.currentPage - 1
            : this.pagination.currentPage
      });
    },

    editItem(item) {
      this.currentItem = { ...item };
      this.modalType = 'update';
      this.modalVisible = true;
    },

    handleCurrentPageChange(page) {
      this.refreshList({
        page
      });
    },

    handlePageSizeChange(pageSize) {
      this.refreshList({
        pageSize
      });
    },

    addItem() {
      this.currentItem = {};
      this.modalVisible = true;
      this.modalType = 'create';
    },

    async handleOk(data, type) {
      if (type === 'create') {
        const id = Math.floor(Math.random() * 10000000);
        const createTime = Date.now();
        await createUser({ id, createTime, ...data });
      } else {
        await updateUser(data.id, { ...data });
      }
      this.modalVisible = false;
      this.refreshList();
    },

    handleFilterChange(fields) {
      this.refreshList({ ...fields, page: DEFAULT_CURRENT_PAGE });
    }
  }
};
</script>

<style lang="scss" scoped>
.user-container {
  width: 80%;
  margin: 20px auto 50px;
  padding: 30px;
  background: #fff;
  .user-filter {
    margin-bottom: 20px;
  }
  .pagination-wrapper {
    text-align: right;
    padding: 30px 0;
  }
}
</style>
