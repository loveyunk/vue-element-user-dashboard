<template>
  <body-color color="#eff1f4">
    <div class="user-container">
      <!-- 搜索 -->
      <user-search
        :search="$route.query"
        :loading="loading"
        @on-search="search"
        @on-create="openCreateUserDialog"
      />

      <!-- 数据列表 -->
      <user-list
        :loading="loading"
        :data-source="users"
        @on-delete="deleteUser"
        @on-update="openUpdateUserDialog"
      />

      <!-- 分页 -->
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

      <!-- 创建或更新弹窗 -->
      <user-dialog-create-or-update
        :type="dialog.type"
        :visible.sync="dialog.visible"
        :loading="dialog.loading"
        :user="user"
        @on-ok="dialogOk"
      />
    </div>
  </body-color>
</template>

<script>
import BodyColor from '@/components/BodyColor/index.vue';
import UserService from '@/services/UserService';

import omitEmpty from 'omit-empty';
import isEqual from 'lodash/isEqual';
import UserList from './components/UserList.vue';
import UserDialogCreateOrUpdate from './components/UserDialogCreateOrUpdate.vue';
import UserSearch from './components/UserSearch.vue';

const DEFAULT_PAGE_SIZE = 10; // default page size
const DEFAULT_CURRENT_PAGE = 1; // default current page

export default {
  name: 'User',

  components: {
    BodyColor,
    UserList,
    UserDialogCreateOrUpdate,
    UserSearch
  },

  data() {
    return {
      loading: false,
      users: [], // 用户列表
      user: {}, // 当前用户
      dialog: {
        visible: false,
        type: 'create',
        loading: false
      },
      pagination: {
        total: null, // 数据总条数
        currentPage: DEFAULT_CURRENT_PAGE, // 当前页
        pageSize: DEFAULT_PAGE_SIZE // 每页条数
      }
    };
  },

  watch: {
    $route: {
      handler({ query }) {
        this.loadUsers(query);
      }
    }
  },

  created() {
    this.loadUsers();
  },

  methods: {
    /**
     * 请求数据列表
     *
     * @param {Object} query
     * @param {string} query.name 名字
     * @param {string} query.page page
     * @param {string} query.pageSize pageSize
     */
    async loadUsers(query = {}) {
      // 1. 显示 loading 状态
      this.loading = true;

      // 2. 更新 data, rul -> data
      this.pagination.pageSize = Number(query.pageSize) || DEFAULT_PAGE_SIZE;
      this.pagination.currentPage = Number(query.page) || DEFAULT_CURRENT_PAGE;

      // 3. 处理请求参数
      const params = omitEmpty(query);

      try {
        // 4. 发送请求
        const res = await UserService.queryUserList(params);

        //  5. 处理请求结果
        if (res.error_code === 0) {
          this.users = Object.freeze(res.data);
          this.pagination.total = res.total;
        } else {
          this.$message({
            message: res.error_msg || '请求失败',
            type: 'error',
            duration: 2000
          });
        }
        // 6. 隐藏 loading 状态
        this.loading = false;
      } catch (error) {
        this.loading = false;
      }
    },

    // 刷新用户列表
    refreshUsers(newQuery = {}) {
      // 1. 合并请求参数
      const query = { ...this.$route.query, ...newQuery };
      // 2. 判断当前 query 与 url 上的 query 是否相同
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

    // 删除用户
    async deleteUser(id) {
      this.loading = true;

      try {
        const res = await UserService.removeUser(id);

        if (res.error_code === 0) {
          this.refreshUsers({
            // 如果删除的非第一页的且只有一条数据，则 page 减 1
            page: String(
              this.users.length === 1 && this.pagination.currentPage > 1
                ? this.pagination.currentPage - 1
                : this.pagination.currentPage
            )
          });
        } else {
          throw res.error_msg;
        }
      } catch (error) {
        this.$message({
          message: error || '请求失败',
          type: 'error',
          duration: 2000
        });

        this.loading = false;
      }
    },

    // 打开更新用户弹窗
    openUpdateUserDialog(user) {
      this.user = { ...user };
      this.dialog.type = 'update';
      this.dialog.visible = true;
    },

    // 打开创建用户信息弹窗
    openCreateUserDialog() {
      this.user = {};
      this.dialog.type = 'create';
      this.dialog.visible = true;
    },

    // page 改变时，刷新列表数据
    handleCurrentPageChange(page) {
      this.refreshUsers({
        page: String(page)
      });
    },

    // pageSize 改变时，刷新列表数据
    handlePageSizeChange(pageSize) {
      this.refreshUsers({
        pageSize: String(pageSize)
      });
    },

    async dialogOk(data, type) {
      this.dialog.loading = true;
      if (type === 'create') {
        const id = Math.floor(Math.random() * 10000000);
        const createTime = Date.now();
        await UserService.createUser({ id, createTime, ...data });
        this.dialog.loading = false;
      } else {
        await UserService.updateUser(data.id, { ...data });
        this.dialog.loading = false;
      }
      this.dialog.visible = false;
      this.refreshUsers();
    },

    // 搜索
    search(fields) {
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
