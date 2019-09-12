<template>
  <div class="user-container">
    <user-filter
      class="user-filter"
      :filter="$route.query"
      :on-filter-change="onFilterChange"
      @on-add="handleAdd"
    ></user-filter>
    <user-list
      :data-source="list"
      :pagination="pagination"
      :loading="loading"
      @on-current-change="handleCurrentChange"
      @on-delete-item="handleDelteItem"
      @on-edit-item="handleEditItem"
    ></user-list>
    <user-modal
      :type="modalType"
      :visible.sync="modalVisible"
      :item="currentItem"
      @on-ok="handleOk"
    ></user-modal>
  </div>
</template>

<script>
import UserList from './components/List'
import UserModal from './components/Modal'
import UserFilter from './components/Filter'
import {
  queryUserList,
  removeUser,
  createUser,
  updateUser
} from '@/services/user'

export default {
  name: 'User',
  components: {
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
      handler (to, from) {
        const query = to.query
        this.queryUserList(query)
      },
      immediate: true
    }
  },
  methods: {
    async queryUserList (payload) {
      this.loading = true
      const res = await queryUserList(payload)
      this.list = res.data
      this.pagination.total = res.total
      this.pagination.currentPage = Number(payload.page) || 1
      this.pagination.pageSize = Number(payload.pageSize) || 10
      this.loading = false
    },
    handleRefresh (newQuery) {
      const query = { ...this.$route.query, ...newQuery }
      this.$router.push(
        {
          name: 'user',
          query
        },
        undefined,
        err => {
          if (err.name === 'NavigationDuplicated') {
            this.queryUserList(query)
          }
        }
      )
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
    handleCurrentChange (page) {
      this.handleRefresh({
        page
      })
    },
    handleAdd () {
      this.currentItem = {}
      this.modalVisible = true
      this.modalType = 'create'
    },
    async handleOk (data, type) {
      if (type === 'create') {
        await createUser(data)
      } else {
        await updateUser(data.id, data)
      }
      this.modalVisible = false
      this.handleRefresh()
    },
    onFilterChange (fields) {
      this.handleRefresh({ ...fields })
    }
  }
}
</script>

<style lang="scss" scoped>
.user-container {
  width: 80%;
  margin: 50px auto;
  padding: 30px;
  background: #fff;
  .user-filter {
    margin-bottom: 20px;
  }
}
</style>
