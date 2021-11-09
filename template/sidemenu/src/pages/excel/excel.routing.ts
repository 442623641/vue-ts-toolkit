
      import { RouteConfig } from 'vue-router'
      import Layout from '@/layout/index.vue'
      
      export const excelRouting: RouteConfig = {
        path: '/excel',
        component: Layout,
        redirect: '/excel',
        name: 'Excel',
        children: [
          {
            path: '',
            component: () => import(/* webpackChunkName: "excel-page" */ '@/pages/excel/excel.page.vue'),
            name: 'excel-page',
            meta: {
              title: 'excel',
              icon: 'excel'
            }
          }
        ]
      }