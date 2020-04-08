<template>
  <div id="app">
    <app-layout>
      <router-view :key="$route.fullPath" />
    </app-layout>
  </div>
</template>

<script>
import AppLayout from '@/layouts/index.vue';

export default {
  components: {
    AppLayout
  }
};
</script>

<style lang="scss">
body {
  margin: 0;
  font-family: 'Open Sans', sans-serif;
  font-size: 16px;
  line-height: 1.5;
}
</style>
