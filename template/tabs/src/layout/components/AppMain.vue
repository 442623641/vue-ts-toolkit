<template>
  <main style="margin: 24px" class="app-main">
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
import { RouteConfig } from "vue-router";
import { PermissionModule } from "@/store/modules/permission.store";
@Component({
  name: "AppMain",
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
        const name = this.getRouteName(cur);
        return Array.isArray(name) ? prev.concat(name) : prev;
      }, []);
    } else {
      return item.name && !item.meta?.noCache ? [item.name] : null;
    }
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
