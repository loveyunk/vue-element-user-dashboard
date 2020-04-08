import Vue from 'vue';
import Router from 'vue-router';

const Home = () => import('@/views/Home/index.vue');
const User = () => import('@/views/User/index.vue');
const UserDetail = () => import('@/views/UserDetail/index.vue');
const NotFound = () => import('@/views/NotFound/index.vue');

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: { name: 'home' }
    },
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
        layout: 'public'
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
