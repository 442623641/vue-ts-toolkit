<template>
  <main class="app-main">
    <SideBar class="sidebar-container" />
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
import SideBar from "./Sidebar/index.vue";
@Component({
  name: "AppMain",
  components: { SideBar },
})
export default class extends Vue {
  get key() {
    return this.$route.path;
  }
}
</script>

<style lang="scss" scoped>
.app-main {
  display: flex;
  max-width: 1440px;
  min-width: 1280px;
  padding: 0 20px;
  width: 100%;
  margin: 0 auto;
}
.sidebar-container {
  overflow: hidden;
  flex: 0 0 $sideBarWidth;
  max-width: $sideBarWidth;
  min-width: $sideBarWidth;
  width: $sideBarWidth;
  margin-top: 10px;
}
.fixed-header + .app-main {
  padding-top: $menuItemHeight;
  overflow: auto;
}
section {
  width: 100%;
  margin: 24px;
}
</style>
