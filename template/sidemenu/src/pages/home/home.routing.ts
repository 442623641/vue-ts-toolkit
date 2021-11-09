
import { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'

export const homeRouting: RouteConfig = {
  path: '/home',
  component: Layout,
  redirect: '/home/home-a',
  meta: {
    title: 'home',
    icon: 'home'
  },
  children: [
    {
      path: 'home-a',
      component: () => import(/* webpackChunkName: "home-b-page" */ '@/pages/home/home-a/home-a.page.vue'),
      name: 'home-a-page',
      meta: {
        title: 'home-a',
        affix: true
      }
    },
    {
      path: 'home-b',
      component: () => import(/* webpackChunkName: "home-b-page" */ '@/pages/home/home-b/home-b.page.vue'),
      name: 'home-b-page',
      meta: {
        title: 'home-b',
        noCache: true,
        roles: ['admin']
      }
    },
    {
      path: 'home-c',
      component: () => import(/* webpackChunkName: "home-b-page" */ '@/pages/home/home-c/home-c.page.vue'),
      name: 'home-c-page',
      meta: {
        title: 'home-c',
        roles: ['viewer']
      }
    }
  ]
}