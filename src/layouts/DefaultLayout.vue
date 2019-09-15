<template>
  <div class="default-layout">
    <the-header></the-header>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import TheHeader from '../components/TheHeader'

export default {
  name: 'DefaultLayout',
  components: {
    TheHeader
  }
}
</script>
