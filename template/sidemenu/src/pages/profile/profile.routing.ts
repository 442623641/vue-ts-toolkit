
import { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'

export const profileRouting: RouteConfig = {
  path: '/profile',
  component: Layout,
  redirect: '/profile',
  meta: { hidden: true },
  children: [
    {
      path: '',
      component: () => import(/* webpackChunkName: "profile-page" */ '@/pages/profile/profile.page.vue'),
      name: 'profile-page',
      meta: {
        title: 'profile',
      }
    }
  ]
}