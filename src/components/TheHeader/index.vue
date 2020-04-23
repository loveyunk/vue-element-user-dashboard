<template>
  <header>
    <el-menu
      :default-active="$route.path"
      mode="horizontal"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
    >
      <el-menu-item index="/home">主页</el-menu-item>
      <el-menu-item index="/user">用户中心</el-menu-item>
      <el-menu-item index="/404">404</el-menu-item>
    </el-menu>
  </header>
</template>

<script>
export default {
  name: 'TheHeader'
};
</script>
