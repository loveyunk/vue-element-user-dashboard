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
import omitEmpty from 'omit-empty'

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
        currentPage: 1,
        pageSize: 10
      }
    }
  },
  watch: {
    $route: {
      handler ({ query }) {
        this.getUserList(query)
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
    async getUserList (query = {}) {
      this.loading = true
      const params = omitEmpty(query)
      const res = await queryUserList(params)
      this.list = Object.freeze(res.data)
      this.pagination.total = res.total
      this.pagination.pageSize = Number(query.pageSize) || 10
      this.pagination.currentPage = Number(query.page) || 1
      this.loading = false
    },

    refreshData (newQuery = {}) {
      const query = { ...this.$route.query, ...newQuery }

      this.$router
        .push({
          name: this.$route.name,
          query
        })
        .catch(() => {
          this.getUserList(query)
        })
    },

    async handleDelteItem (id) {
      this.loading = true
      await removeUser(id)
      this.refreshData({
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
      this.refreshData({
        page
      })
    },

    handlePageSizeChange (pageSize) {
      this.refreshData({
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
      this.refreshData()
    },

    handleFilterChange (fields) {
      this.refreshData({ ...fields })
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
