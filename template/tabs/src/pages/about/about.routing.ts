// Created by ZhangLeo on 2021-11-03

      import { RouteConfig } from 'vue-router'
      import Layout from '@/layout/index.vue'
      
      export const aboutRouting: RouteConfig = {
        path: '/about',
        component: Layout,
        redirect: '/about',
        children: [
          {
            path: '',
            component: () => import(/* webpackChunkName: "about-page" */ '@/pages/about/about.page.vue'),
            name: 'about-page',
            meta: {
              title: 'about',
              icon: 'about'
            }
          }
        ]
      }