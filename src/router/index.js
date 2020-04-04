import Vue from 'vue';
import Router from 'vue-router';
import User from '@/views/User/index.vue';
import UserDetail from '@/views/UserDetail/index.vue';
import Home from '@/views/Home/index.vue';
import NotFound from '@/views/NotFound/index.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/home',
      name: 'home',
      component: Home,
      meta: {
        layout: 'primary'
      }
    },
    {
      path: '/user',
      name: 'user',
      component: User,
      meta: {
        layout: 'primary'
      }
    },
    {
      path: '/user/:id',
      name: 'user-detail',
      component: UserDetail,
      props: true,
      meta: {
        layout: 'primary'
      }
    },
    {
      path: '/404',
      name: '404',
      component: NotFound,
      meta: {
        layout: 'public'
      }
    },
    {
      path: '*',
      redirect: {
        name: '404'
      }
    }
  ]
});
