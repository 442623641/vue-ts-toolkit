// Created by ZhangLeo on 2021-11-09
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'about3-page',
  components: {}
})

export default class extends Vue {

  mounted() {
    console.log('Hellow,I\'m page about3');
  }
}