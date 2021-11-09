import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'excel-page',
  components: {}
})

export default class extends Vue {

  mounted() {
    console.log('Hellow,I\'m page excel');
  }
}