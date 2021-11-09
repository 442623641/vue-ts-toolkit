
import { RouteConfig } from 'vue-router'

export const loginRouting: RouteConfig = {
  path: '/login',
  component: () => import(/* webpackChunkName: "login-page" */ '@/pages/login/login.page.vue'),
  name: 'login-page',
  meta: {
    hidden: true,
  }
}