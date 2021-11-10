// Created by ZhangLeo on 2021-11-03

      import { RouteConfig } from 'vue-router'
      import Layout from '@/layout/index.vue'
      
      export const usersRouting: RouteConfig = {
        path: '/users',
        component: Layout,
        redirect: '/users',
        children: [
          {
            path: '',
            component: () => import(/* webpackChunkName: "users-page" */ '@/pages/users/users.page.vue'),
            name: 'users-page',
            meta: {
              title: 'users',
              icon: 'users'
            }
          }
        ]
      }