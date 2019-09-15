import Vue from 'vue'
import Router from 'vue-router'
import User from '@/views/User'
import Home from '@/views/Home'
import DefaultLayout from '@/layouts/DefaultLayout'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: DefaultLayout,
      redirect: '/home',
      children: [
        {
          path: 'home',
          component: Home,
          name: 'Home'
        }
      ]
    },
    {
      path: '/user',
      component: DefaultLayout,
      children: [
        {
          path: '/',
          component: User,
          name: 'User'
        }
      ]
    }
  ]
})
