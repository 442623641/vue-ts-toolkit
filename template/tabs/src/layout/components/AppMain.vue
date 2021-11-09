<template>
  <main style="margin: 24px" class="app-main">
    <section>
      <transition name="fade-transform" mode="out-in">
        <keep-alive>
          <router-view :key="key" />
        </keep-alive>
      </transition>
    </section>
  </main>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "AppMain",
})
export default class extends Vue {
  get key() {
    return this.$route.path;
  }
}
</script>

<style lang="scss" scoped>
section {
  max-width: 1200px;
  margin: 0 auto;
}

.fixed-header + .app-main {
  padding-top: 50px;
  overflow: auto;
}
</style>
