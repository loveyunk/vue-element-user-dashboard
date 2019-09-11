<template>
  <div class="filter-container">
    <el-row>
      <el-col :span="6">
        <el-input suffix-icon="el-icon-search"></el-input>
      </el-col>
      <el-col :span="6">
        <el-row type="flex" justify="space-between">
          <div>
            <el-button type="primary">搜索</el-button>
            <el-button>重置</el-button>
          </div>
          <el-button @click="handleAdd">创建</el-button>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'UserFilter',
  methods: {
    handleAdd () {
      this.$emit('on-add')
    }
  }
}
</script>
