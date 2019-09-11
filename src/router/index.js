import Vue from 'vue'
import Router from 'vue-router'
import User from '@/views/User'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/user',
      name: 'user',
      component: User
    }
  ]
})
