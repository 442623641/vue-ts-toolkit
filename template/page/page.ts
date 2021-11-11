import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: '$fileName$-$type$',
  components: {}
})

export default class extends Vue {

  mounted() {
    console.log('Hello,I\'m $type$ $fileName$');
  }
}