<template>
  <component :is="layout">
    <slot />
  </component>
</template>

<script>
import PrimaryLayout from './PrimaryLayout.vue';
import PublicLayout from './PublicLayout.vue';

export default {
  components: {
    primary: PrimaryLayout,
    public: PublicLayout
  },

  computed: {
    layout() {
      return this.$route.meta.layout || 'primary';
    }
  }
};
</script>
