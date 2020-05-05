<template>
  <div class="search">
    <el-row type="flex" justify="space-between">
      <el-col :span="6">
        <el-input
          v-model="name"
          clearable
          suffix-icon="el-icon-search"
          @keyup.native.enter="handleSearch"
          @clear="handleSearch"
        />
      </el-col>

      <el-col :span="17">
        <el-row type="flex" justify="space-between">
          <div>
            <el-button type="primary" @click="handleSearch">搜索</el-button>
            <el-button @click="reset">重置</el-button>
          </div>
          <el-button @click="$emit('on-create-user')">创建</el-button>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  props: {
    search: {
      type: Object,
      default() {
        return {};
      }
    }
  },

  data() {
    return {
      name: this.search.name
    };
  },

  watch: {
    search: {
      handler({ name }) {
        this.name = name;
      },
      immediate: true
    }
  },

  methods: {
    reset() {
      for (const key in this.$data) {
        if (Object.prototype.hasOwnProperty.call(this.$data, key)) {
          if (this.$data[key] instanceof Array) {
            this.$data[key] = [];
          } else {
            this.$data[key] = undefined;
          }
        }
      }

      this.handleSearch();
    },

    handleSearch() {
      this.$emit('on-search-user', { name: this.name });
    }
  }
};
</script>

<style lang="scss" scoped>
.search {
  margin-bottom: 20px;
}
</style>
