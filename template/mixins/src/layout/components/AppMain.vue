<template>
  <main class="app-main">
    <SideBar class="sidebar-container" />
    <section>
      <transition name="fade-transform" mode="out-in">
        <keep-alive :include="cachePages">
          <router-view :key="key" />
        </keep-alive>
      </transition>
    </section>
  </main>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { PermissionModule } from "@/store/modules/permission.store";
import { RouteConfig } from "vue-router";
import SideBar from "./Sidebar/index.vue";
@Component({
  name: "AppMain",
  components: { SideBar },
})
export default class extends Vue {
  get key() {
    return this.$route.path;
  }

  get cachePages() {
    return this.getRouteName(<RouteConfig>{
      children: PermissionModule.routes,
    });
  }

  private getRouteName(item: RouteConfig) {
    if (item.children && item.children.length) {
      return item.children.reduce((prev, cur) => {
        let name = this.getRouteName(cur);
        return Array.isArray(name) ? prev.concat(name) : prev;
      }, []);
    } else {
      return item.name && !item.meta?.noCache ? [item.name] : null;
    }
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
