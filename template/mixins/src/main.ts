import Vue, { DirectiveOptions } from 'vue'

import 'normalize.css'
import ElementUI from 'element-ui'
import SvgIcon from 'vue-svgicon'

import '@/styles/element-variables.scss'
import '@/styles/index.scss'

import App from '@/App.vue'
import store from '@/store'
import { AppModule } from '@/store/modules/app.store'
import router from '@/router'
import '@/icons/components'
import '@/permission'
import * as directives from '@/directives'
import * as filters from '@/filters'
import { Modal } from './modals/modal/modal'
import Pagination from '@/components/Pagination/index.vue'
Vue.component('Pagination', Pagination)
Vue.use(Modal)

Vue.use(ElementUI, {
  size: AppModule.size // Set element-ui default size
})

Vue.use(SvgIcon, {
  tagName: 'svg-icon',
  defaultWidth: '1em',
  defaultHeight: '1em'
})

// Register global directives
Object.keys(directives).forEach(key => {
  Vue.directive(key, (directives as { [key: string]: DirectiveOptions })[key])
})

// Register global filter functions
Object.keys(filters).forEach(key => {
  Vue.filter(key, (filters as { [key: string]: Function })[key])
})

Vue.config.productionTip = true;
new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
