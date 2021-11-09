import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

/* Layout */
import Layout from '@/layout/index.vue'

import { aboutRouting } from '@/pages/about/about.routing'
import { excelRouting } from '@/pages/excel/excel.routing'
import { homeRouting } from '@/pages/home/home.routing'
import { usersRouting } from '@/pages/users/users.routing'
import { profileRouting } from '@/pages/profile/profile.routing'
import { loginRouting } from '@/pages/login/login.routing'
import { iconsRouting } from '@/pages/icons/icons.routing'

Vue.use(VueRouter)

export const constantRoutes: Array<RouteConfig> = [
  loginRouting,
  homeRouting,
  aboutRouting,
  usersRouting,
  profileRouting,
  iconsRouting,
  {
    path: '/',
    component: Layout,
    redirect: '/home'
  }
]
/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
*/
export const asyncRoutes: RouteConfig[] = [
  excelRouting
]

const createRouter = () => new VueRouter({
  // mode: 'history',  // Disabled due to Github Pages doesn't support this, enable this if you need.
  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  base: process.env.BASE_URL,
  routes: constantRoutes
})
const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  (router as any).matcher = (newRouter as any).matcher // reset router
}

export default router
