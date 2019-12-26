<template>
  <body-color color="#eff1f4">
    <div class="user-container">
      <user-filter
        class="user-filter"
        :filter="$route.query"
        :on-filter-change="handleFilterChange"
        @on-add="handleAdd"
      ></user-filter>
      <user-list
        :data-source="list"
        :loading="loading"
        @on-delete-item="handleDelteItem"
        @on-edit-item="handleEditItem"
      ></user-list>
      <user-modal
        :type="modalType"
        :visible.sync="modalVisible"
        :item="currentItem"
        @on-ok="handleOk"
      ></user-modal>
      <div class="pagination-wrapper">
        <el-pagination
          v-if="list.length"
          v-bind="pagination"
          layout="total, sizes, prev, pager, next, jumper"
          background
          @current-change="handleCurrentPageChange"
          @size-change="handlePageSizeChange"
          :page-sizes="[10, 20, 30, 40]"
        ></el-pagination>
      </div>
    </div>
  </body-color>
</template>

<script>
import BodyColor from '@/components/BodyColor'
import UserList from './components/List'
import UserModal from './components/Modal'
import UserFilter from './components/Filter'
import {
  queryUserList,
  removeUser,
  createUser,
  updateUser
} from '@/services/user'
import shallowEqual from '../../utils/shallowEqual'
import omitEmpty from 'omit-empty'

const DEFAULT_PAGE_SIZE = 10
const DEFAULT_CURRENT_PAGE = 1

export default {
  name: 'User',
  components: {
    BodyColor,
    UserList,
    UserModal,
    UserFilter
  },
  data () {
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
    }
  },
  watch: {
    $route: {
      handler ({ query }) {
        this.fetchUserList(query)
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
    async fetchUserList (query = {}) {
      this.loading = true
      const params = omitEmpty(query)
      const res = await queryUserList(params)
      this.list = Object.freeze(res.data)
      this.pagination.total = res.total
      this.pagination.pageSize = Number(query.pageSize) || DEFAULT_PAGE_SIZE
      this.pagination.currentPage = Number(query.page) || DEFAULT_CURRENT_PAGE
      this.loading = false
    },

    handleRefresh (newQuery = {}) {
      const query = { ...this.$route.query, ...newQuery }

      if (!shallowEqual(query, this.$route.query)) {
        this.$router.push({
          path: this.$route.path,
          query: {
            ...query
          }
        })
      } else {
        this.fetchUserList(query)
      }
    },

    async handleDelteItem (id) {
      this.loading = true
      await removeUser(id)
      this.handleRefresh({
        page:
          this.list.length === 1 && this.pagination.currentPage > 1
            ? this.pagination.currentPage - 1
            : this.pagination.currentPage
      })
    },

    handleEditItem (item) {
      this.currentItem = { ...item }
      this.modalType = 'update'
      this.modalVisible = true
    },

    handleCurrentPageChange (page) {
      this.handleRefresh({
        page
      })
    },

    handlePageSizeChange (pageSize) {
      this.handleRefresh({
        pageSize
      })
    },

    handleAdd () {
      this.currentItem = {}
      this.modalVisible = true
      this.modalType = 'create'
    },

    async handleOk (data, type) {
      if (type === 'create') {
        const id = Math.floor(Math.random() * 10000000)
        const createTime = Date.now()
        await createUser({ id, createTime, ...data })
      } else {
        await updateUser(data.id, { ...data })
      }
      this.modalVisible = false
      this.handleRefresh()
    },

    handleFilterChange (fields) {
      this.handleRefresh({ ...fields })
    }
  }
}
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
