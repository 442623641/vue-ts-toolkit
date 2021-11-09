// Created by ZhangLeo on 2021-11-03

      import { RouteConfig } from 'vue-router'
      import Layout from '@/layout/index.vue'
      
      export const iconsRouting: RouteConfig = {
        path: '/icons',
        component: Layout,
        redirect: '/icons',
        children: [
          {
            path: '',
            component: () => import(/* webpackChunkName: "icons-page" */ '@/pages/icons/icons.page.vue'),
            name: 'icons-page',
            meta: {
              title: 'icons',
              icon: 'icons'
            }
          }
        ]
      }