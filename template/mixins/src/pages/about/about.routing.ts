import { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'

export const aboutRouting: RouteConfig = {
  path: '/about',
  component: Layout,
  redirect: '/about/about1',
  meta: {
    title: 'about',
    icon: 'about'
  },
  children: [
    {
      path: 'about1',
      component: () => import(/* webpackChunkName: "about1-page" */ '@/pages/about/about1/about1.page.vue'),
      name: 'about1-page',
      meta: {
        title: 'about1',
        icon: 'about1'
      }
    },
    {
      path: 'about2',
      component: () => import(/* webpackChunkName: "about2-page" */ '@/pages/about/about2/about2.page.vue'),
      name: 'about2-page',
      meta: {
        title: 'about2',
        icon: 'about2'
      }
    },
    {
      path: 'about3',
      component: () => import(/* webpackChunkName: "about3-page" */ '@/pages/about/about3/about3.page.vue'),
      name: 'about3-page',
      meta: {
        title: 'about3',
        icon: 'about3'
      }
    },
    {
      path: 'about4',
      component: () => import(/* webpackChunkName: "about4-page" */ '@/pages/about/about4/about4.page.vue'),
      name: 'about4-page',
      meta: {
        title: 'about4',
        icon: 'about4'
      }
    }
  ]
}