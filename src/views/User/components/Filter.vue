<template>
  <div>
    <el-row type="flex" justify="space-between">
      <el-col :span="6">
        <el-input
          v-model="name"
          clearable
          suffix-icon="el-icon-search"
          @keyup.native.enter="queryResult"
          @clear="queryResult"
        />
      </el-col>

      <el-col :span="17">
        <el-row type="flex" justify="space-between">
          <div>
            <el-button type="primary" @click="queryResult">搜索</el-button>
            <el-button @click="resetForm">重置</el-button>
          </div>
          <el-button @click="$emit('add-item')">创建</el-button>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  props: {
    filter: {
      type: Object,
      default() {
        return {};
      }
    },

    onFilterChange: {
      type: Function,
      default() {
        return () => {};
      }
    }
  },

  data() {
    return {
      name: this.filter.name
    };
  },

  watch: {
    filter({ name }) {
      this.name = name;
    }
  },

  methods: {
    handleFields() {
      return {
        ...this.$data
      };
    },

    resetForm() {
      for (const key in this.$data) {
        if (Object.prototype.hasOwnProperty.call(this.$data, key)) {
          if (this.$data[key] instanceof Array) {
            this.$data[key] = [];
          } else {
            this.$data[key] = undefined;
          }
        }
      }
      this.handleSubmit();
    },

    queryResult() {
      const filter = this.handleFields();
      this.onFilterChange(filter);
    }
  }
};
</script>
