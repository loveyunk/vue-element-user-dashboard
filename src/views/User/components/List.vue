<template>
  <div class="list-container">
    <el-table :data="dataSource" v-loading="loading" border>
      <el-table-column label="头像" align="center" fixed width="72">
        <template slot-scope="scope">
          <el-avatar shape="circle" :src="scope.row.avatar"></el-avatar>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="名字"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="nickName"
        label="昵称"
        align="center"
        width="100"
      ></el-table-column>
      <el-table-column
        prop="age"
        label="年龄"
        align="center"
        width="62"
      ></el-table-column>
      <el-table-column label="性别" align="center" width="62">
        <template slot-scope="scope">
          <span>{{ scope.row.isMale ? '男' : '女' }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="phone"
        label="电话"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="email"
        label="电子邮件"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="address"
        label="地址"
        align="center"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column label="创建时间" align="center">
        <template slot-scope="scope">
          <span>{{ Number(scope.row.createTime) | formatDate }}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="100" align="center">
        <template slot-scope="scope">
          <el-button @click="handleEditItem(scope.row)" type="text" size="small"
            >更新</el-button
          >
          <el-button
            @click="handleDeleteItem(scope.row)"
            type="text"
            size="small"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-wrapper">
      <el-pagination
        v-if="dataSource.length"
        v-bind="pagination"
        layout="total, sizes, prev, pager, next, jumper"
        background
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
        :page-sizes="[10, 20, 30, 40]"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserList',
  props: {
    dataSource: {
      type: Array,
      required: true
    },
    pagination: {
      type: Object,
      required: true
    },
    loading: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    handleEditItem (item) {
      this.$emit('on-edit-item', item)
    },
    handleDeleteItem ({ id }) {
      this.$confirm('您确定要删除这条记录吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$emit('on-delete-item', id)
        })
        .catch(() => {
          // cancel
        })
    },
    handleCurrentChange (page) {
      this.$emit('on-current-change', page)
    },
    handleSizeChange (pageSize) {
      this.$emit('on-size-change', pageSize)
    }
  }
}
</script>

<style lang="scss" scoped>
.list-container {
  .pagination-wrapper {
    text-align: right;
    padding: 30px 0;
  }
}
</style>
