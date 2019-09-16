<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'BodyColor',
  props: {
    color: {
      type: String,
      default: '#fff'
    }
  },
  watch: {
    color (val) {
      document.body.style.backgroundColor = val
    }
  },
  created () {
    document.body.style.backgroundColor = this.color
  },
  destroyed () {
    document.body.style.backgroundColor = '#fff'
  }
}
</script>
