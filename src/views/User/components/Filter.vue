<template>
  <div class="filter-container">
    <el-row>
      <el-col :span="6">
        <el-input
          v-model="name"
          @change="handleChange"
          @keyup.native.enter="handleEnter"
          suffix-icon="el-icon-search"
        ></el-input>
      </el-col>
      <el-col :span="6">
        <el-row type="flex" justify="space-between">
          <div>
            <el-button type="primary" @click="handleSubmit">搜索</el-button>
            <el-button @click="handleReset">重置</el-button>
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
  props: {
    filter: {
      type: Object,
      default () {
        return {}
      }
    },
    onFilterChange: {
      type: Function,
      default () {
        return () => {}
      }
    }
  },
  data () {
    return {
      name: this.filter.name
    }
  },
  methods: {
    handleFields () {
      return {
        ...this.$data
      }
    },
    handleSubmit () {
      const filter = this.handleFields()
      this.onFilterChange(filter)
    },
    handleReset () {
      for (const key in this.$data) {
        if (this.$data.hasOwnProperty(key)) {
          if (this.$data[key] instanceof Array) {
            this.$data[key] = []
          } else {
            this.$data[key] = undefined
          }
        }
      }
      this.handleSubmit()
    },
    handleChange () {},
    handleEnter () {
      const filter = this.handleFields()
      this.onFilterChange(filter)
    },
    handleAdd () {
      this.$emit('on-add')
    }
  }
}
</script>
