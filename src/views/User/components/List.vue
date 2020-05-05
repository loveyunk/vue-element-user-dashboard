<template>
  <div>
    <el-table v-loading="loading" :data="dataSource" border>
      <el-table-column label="头像" align="center" fixed width="72">
        <template slot-scope="scope">
          <el-avatar shape="circle" :src="scope.row.avatar" />
        </template>
      </el-table-column>

      <el-table-column label="名字" align="center">
        <template slot-scope="scope">
          <router-link
            :to="{ name: 'user-detail', params: { id: scope.row.id } }"
          >
            {{ scope.row.name }}
          </router-link>
        </template>
      </el-table-column>

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
            @click="$emit('on-update-user', scope.row)"
          >
            更新
          </el-button>
          <el-popconfirm
            title="您确定要删除这条记录吗?"
            @onConfirm="deleteUser(scope.row)"
          >
            <el-button slot="reference" type="text" size="small">
              删除
            </el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import dayjs from 'dayjs';

export default {
  filters: {
    formatDate(timestamp) {
      return dayjs(timestamp).format('YYYY-MM-DD');
    }
  },

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
    deleteUser({ id }) {
      this.$emit('on-delete-user', id);
    }
  }
};
</script>
