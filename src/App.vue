<template>
  <div id="app">
    <base-layout>
      <router-view />
    </base-layout>
  </div>
</template>

<script>
import BaseLayout from './layouts/BaseLayout.vue';

export default {
  components: {
    BaseLayout
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
