<template>
  <div class="not-found">
    <h1>哎呀!</h1>
    <h3>您要找的页面不存在</h3>
    <router-link :to="{ name: 'home' }">返回主页</router-link>
  </div>
</template>

<style lang="scss" scoped>
.not-found {
  text-align: center;
}
</style>
