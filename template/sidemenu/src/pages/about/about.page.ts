import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'about-page',
  components: {}
})

export default class extends Vue {

  mounted() {
    console.log('Hellow,I\'m page about');
  }
}