<template>
  <div class="list-container">
    <el-table v-loading="loading" :data="dataSource" border>
      <el-table-column label="头像" align="center" fixed width="72">
        <template slot-scope="scope">
          <el-avatar shape="circle" :src="scope.row.avatar" />
        </template>
      </el-table-column>
      <el-table-column prop="name" label="名字" align="center" />
      <el-table-column
        prop="nickName"
        label="昵称"
        align="center"
        width="100"
      />
      <el-table-column prop="age" label="年龄" align="center" width="62" />
      <el-table-column label="性别" align="center" width="62">
        <template slot-scope="scope">
          <span>{{ scope.row.isMale ? '男' : '女' }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="phone" label="电话" align="center" />
      <el-table-column prop="email" label="电子邮件" align="center" />
      <el-table-column
        prop="address"
        label="地址"
        align="center"
        show-overflow-tooltip
      />
      <el-table-column label="创建时间" align="center">
        <template slot-scope="scope">
          <span>{{ Number(scope.row.createTime) | formatDate }}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="100" align="center">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="$emit('on-edit-item', scope.row)"
            >更新</el-button
          >
          <el-button type="text" size="small" @click="deleteItem(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: {
    dataSource: {
      type: Array,
      required: true
    },
    loading: {
      type: Boolean,
      required: false
    }
  },

  methods: {
    deleteItem({ id }) {
      this.$confirm('您确定要删除这条记录吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$emit('on-delete-item', id);
        })
        .catch(() => {
          // cancel
        });
    }
  }
};
</script>
