// Created by ZhangLeo on 2021-10-18
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'collapse',
  components: {}
})
export default class extends Vue {
  isActive = false;
  showContent = true;
  contentHeight = '0px';
  mounted() {
    let $collapse: HTMLElement = this.$refs.collapse as HTMLElement;
    let content = $collapse.lastElementChild as HTMLElement;
    this.contentHeight = content.offsetHeight + 'px';
    $collapse.style.setProperty('--content-height', this.contentHeight);
    this.showContent = false;
  }
}