// Created by ZhangLeo on 2021-11-03
import { Component, Vue } from 'vue-property-decorator'
import { elementIcons } from './element-icons';

@Component({
  name: 'icons-page',
  components: {}
})

export default class extends Vue {
  svgIcons = this.getSvgIcons();
  elementIcons = elementIcons;
  mounted() {
    console.log('Hello,I\'m page icons');
  }

  generateElementIconCode(symbol: string) {
    return `<i class="el-icon-${symbol}" />`
  }

  generateSvgIconCode(symbol: string) {
    return `<svg-icon name="${symbol}" />`
  }

  private getSvgIcons() {
    const req = require.context('../../icons/svg', false, /\.svg$/)
    const re = /\.\/(.*)\.svg/
    const requireAll = (requireContext: any) => requireContext.keys()

    return requireAll(req).map((str: string) => {
      const match = str.match(re)
      if (match !== null) return match[1]
      return null
    })

  }
}