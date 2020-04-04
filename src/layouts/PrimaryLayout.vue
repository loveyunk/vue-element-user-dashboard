<template>
  <div>
    <TheHeader />
    <main>
      <router-view />
    </main>
  </div>
</template>

<script>
import TheHeader from '@/components/TheHeader/index.vue';

export default {
  components: {
    TheHeader
  }
};
</script>
