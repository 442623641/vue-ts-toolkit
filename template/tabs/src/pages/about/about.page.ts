// Created by ZhangLeo on 2021-11-03
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'about-page',
  components: {}
})

export default class extends Vue {

  mounted() {
    console.log('Hello,I\'m page about');
  }
}