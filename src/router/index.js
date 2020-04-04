import Vue from 'vue';
import Router from 'vue-router';
import User from '@/views/User/index.vue';
import Home from '@/views/Home/index.vue';
import NotFound from '@/views/NotFound/index.vue';
import DefaultLayout from '@/layouts/DefaultLayout.vue';

Vue.use(Router);

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
          name: 'home'
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
          name: 'user'
        }
      ]
    },
    {
      path: '/404',
      name: '404',
      component: NotFound
    },
    {
      path: '*',
      redirect: {
        name: '404'
      }
    }
  ]
});
