// Created by ZhangLeo on 2021-11-03
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'home-c-page',
  components: {}
})

export default class extends Vue {

  mounted() {
    console.log('Hello,I\'m page home-c');
  }
}