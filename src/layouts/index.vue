<template>
  <component :is="layout">
    <slot />
  </component>
</template>

<script>
import blank from './blank.vue';
import primary from './primary.vue';

export default {
  components: {
    primary,
    blank
  },

  computed: {
    layout() {
      return this.$route.meta.layout || 'primary';
    }
  }
};
</script>
