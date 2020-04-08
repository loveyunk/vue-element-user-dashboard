<template>
  <component :is="layout">
    <slot />
  </component>
</template>

<script>
import publicLayout from './public.vue';
import primary from './primary.vue';

export default {
  components: {
    primary,
    public: publicLayout
  },

  computed: {
    layout() {
      return this.$route.meta.layout || 'primary';
    }
  }
};
</script>
