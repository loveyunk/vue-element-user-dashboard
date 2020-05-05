<template>
  <body-color color="#eff1f4">
    <div class="user-container">
      <user-search
        :search="$route.query"
        @on-search-user="searchUser"
        @on-create-user="openCreateUserDialog"
      />

      <user-list
        :loading="loading"
        :data-source="users"
        @on-delete-user="deleteUser"
        @on-update-user="openUpdateUserDialog"
      />

      <user-dialog
        :type="dialogType"
        :visible.sync="dialog"
        :loading="dialogLoading"
        :user="user"
        @on-ok="dialogOk"
      />

      <el-pagination
        v-if="users.length"
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
import UserService from '@/services/UserService';

import omitEmpty from 'omit-empty';
import isEqual from 'lodash/isEqual';
import UserList from './components/List.vue';
import UserDialog from './components/Dialog.vue';
import UserSearch from './components/Search.vue';

const DEFAULT_PAGE_SIZE = 10; // default page size
const DEFAULT_CURRENT_PAGE = 1; // default current page

export default {
  components: {
    BodyColor,
    UserList,
    UserDialog,
    UserSearch
  },

  data() {
    return {
      loading: false,
      users: [],
      user: {},
      dialog: false,
      dialogType: 'create',
      dialogLoading: false,
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
        this.loadUsers(query);
      },
      immediate: true
    }
  },

  methods: {
    /**
     * @param {Object} query
     * @param {string} query.name 姓名
     * @param {string} query.page 页码
     * @param {string} query.pageSize 每页显示条目数
     */
    async loadUsers(query = {}) {
      this.loading = true;
      this.pagination.pageSize = Number(query.pageSize) || DEFAULT_PAGE_SIZE;
      this.pagination.currentPage = Number(query.page) || DEFAULT_CURRENT_PAGE;

      const params = omitEmpty(query);
      const res = await UserService.queryUserList(params);
      this.users = Object.freeze(res.data);
      this.pagination.total = res.total;
      this.loading = false;
    },

    refreshUsers(newQuery = {}) {
      const query = { ...this.$route.query, ...newQuery };
      if (!isEqual(query, this.$route.query)) {
        this.$router.push({
          path: this.$route.path,
          query: {
            ...query
          }
        });
      } else {
        this.loadUsers(query);
      }
    },

    async deleteUser(id) {
      this.loading = true;
      await UserService.removeUser(id);
      this.refreshUsers({
        page: String(
          this.users.length === 1 && this.pagination.currentPage > 1
            ? this.pagination.currentPage - 1
            : this.pagination.currentPage
        )
      });
    },

    openUpdateUserDialog(user) {
      this.user = { ...user };
      this.dialogType = 'update';
      this.dialog = true;
    },

    openCreateUserDialog() {
      this.user = {};
      this.dialog = true;
      this.dialogType = 'create';
    },

    handleCurrentPageChange(page) {
      this.refreshUsers({
        page: String(page)
      });
    },

    handlePageSizeChange(pageSize) {
      this.refreshUsers({
        pageSize: String(pageSize)
      });
    },

    async dialogOk(data, type) {
      this.dialogLoading = true;
      if (type === 'create') {
        const id = Math.floor(Math.random() * 10000000);
        const createTime = Date.now();
        await UserService.createUser({ id, createTime, ...data });
        this.dialogLoading = false;
      } else {
        await UserService.updateUser(data.id, { ...data });
        this.dialogLoading = false;
      }
      this.dialog = false;
      this.refreshUsers();
    },

    searchUser(fields) {
      this.refreshUsers({ ...fields, page: String(DEFAULT_CURRENT_PAGE) });
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
  .pagination-wrapper {
    text-align: right;
    padding: 30px 0;
  }
}
</style>
