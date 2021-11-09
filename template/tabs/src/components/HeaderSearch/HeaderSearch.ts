// Created by ZhangLeo on 2021-10-15

import { vm } from '@/utils/event';
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  name: 'header-search'
})
export default class extends Vue {
  @Prop({ required: true }) redirect!: string;
  search = ''
  show = false;
  oldSearch = '';
  timer = null
  mounted() { }

  click() {
    this.show = true
    this.$refs.headerSearchSelect && (this.$refs.headerSearchSelect as HTMLElement).focus()
  }

  async patch() {
    clearTimeout(this.timer)
    let keyword = (this.search || '').trim();
    keyword && keyword != this.oldSearch && (this.oldSearch = keyword) && this.$router.push({ name: this.redirect, params: { keyword } }).catch(err => {
      vm.$emit(this.redirect + ':search', keyword)
    })
    this.timer = setTimeout(() => {
      this.oldSearch = this.search = '';
      this.show = false
    }, 500)
  }
}