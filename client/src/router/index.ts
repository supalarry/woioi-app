import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '@/views/Home.vue';
import Register from '@/views/auth/Register.vue';
import Login from '@/views/auth/Login.vue';
import Search from '@/views/domain/search/SearchSong.vue';
import Add from '@/views/domain/add/AddSong.vue';
import Learn from '@/views/domain/learn/LearnSong.vue';
import store from '@/store/index';

Vue.use(VueRouter);

function loggedInRedirectSongs(to: any, from: any, next: any) {
  if (store.getters.getLoggedInUser) {
    next('/songs');
  } else {
    next();
  }
}

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    beforeEnter: loggedInRedirectSongs,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    beforeEnter: loggedInRedirectSongs,
  },
  {
    path: '/search',
    name: 'Search',
    component: Search,
    beforeEnter: (to: any, from: any, next: any) => {
      if (store.getters.getLoggedInUser) {
        next();
      } else {
        next('/login');
      }
    },
  },
  {
    path: '/add',
    name: 'Add',
    component: Add,
    beforeEnter: (to: any, from: any, next: any) => {
      if (store.getters.getLoggedInUser) {
        next();
      } else {
        next('/login');
      }
    },
  },
  {
    path: '/learn/:id',
    name: 'Learn',
    component: Learn,
    beforeEnter: (to: any, from: any, next: any) => {
      if (store.getters.getLoggedInUser) {
        next();
      } else {
        next('/login');
      }
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
