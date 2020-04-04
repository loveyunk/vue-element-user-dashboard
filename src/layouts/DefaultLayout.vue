<template>
  <div class="default-layout">
    <the-header />
    <main>
      <router-view />
    </main>
  </div>
</template>

<script>
import TheHeader from '@/components/TheHeader/index.vue';

export default {
  name: 'DefaultLayout',
  components: {
    TheHeader
  }
};
</script>
