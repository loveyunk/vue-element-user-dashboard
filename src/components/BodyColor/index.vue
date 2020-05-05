<script>
export default {
  props: {
    color: {
      type: String,
      default: '#fff'
    }
  },

  watch: {
    color(val) {
      document.body.style.backgroundColor = val;
    }
  },

  created() {
    document.body.style.backgroundColor = this.color;
  },

  beforeDestroy() {
    document.body.style.backgroundColor = '#fff';
  },

  render(h) {
    return h('div', this.$slots.default);
  }
};
</script>
