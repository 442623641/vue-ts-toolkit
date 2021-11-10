<template>
  <el-menu
    :default-active="activeMenu"
    :collapse-transition="true"
    mode="horizontal"
    router
  >
    <template v-for="route in routes">
      <el-menu-item :index="`${route.path}`" :key="route.path" :route="route">
        <svg-icon
          v-if="route.meta && route.meta.icon"
          :name="route.meta.icon"
        />
        <span v-if="route.meta && route.meta.title" slot="title">{{
          route.meta.title
        }}</span>
      </el-menu-item>
    </template>
  </el-menu>
</template>

<script lang="ts">
import { resolve } from "@/utils/path";
import { Component, Vue } from "vue-property-decorator";
import { PermissionModule } from "@/store/modules/permission.store";
import { SettingsModule } from "@/store/modules/settings.store";
import Hamburger from "@/components/Hamburger/index.vue";
@Component({
  name: "HeadNavbar",
  components: {
    Hamburger,
  },
})
export default class extends Vue {
  get routes() {
    return PermissionModule.routes
      .map((v) => this.theOnlyOneChild(v))
      .filter((x) => x && !x?.meta?.hidden);
  }

  get showLogo() {
    return SettingsModule.showSidebarLogo;
  }
  get showSettings() {
    return SettingsModule.showSettings;
  }
  get sidebarTextTheme() {
    return SettingsModule.sidebarTextTheme;
  }

  get activeMenu() {
    const route = this.$route;
    const { meta, path } = route;
    // if set path, the sidebar will highlight the path you set
    if (meta.activeMenu) {
      return meta.activeMenu;
    }
    return route.matched[0]?.path;
  }

  handleSelect(index, indexPath) {
    console.log(arguments);
  }

  alwaysShowRootMenu(item) {
    if (item.meta && item.meta.alwaysShow) {
      return true;
    }
    return false;
  }

  private showingChildNumber(item) {
    if (item.children) {
      const showingChildren = item.children.filter((item) => {
        if (item.meta && item.meta.hidden) {
          return false;
        } else {
          return true;
        }
      });
      return showingChildren.length;
    }
    return 0;
  }

  theOnlyOneChild(item) {
    if (this.showingChildNumber(item) > 1 || !item.children) {
      return item;
    }
    if (item.children) {
      for (const child of item.children) {
        if (!child.meta || !child.meta.hidden) {
          //如果只有有个子路路由，子路由等级提升，继承父路由icon
          child.meta = child.meta || {};
          child.meta.icon = child.meta.icon || (item.meta || {}).icon;
          return { ...child, path: resolve(item.path, child.path) };
        }
      }
    }
  }

  resolvePath(basePath, routePath: string) {
    return resolve(basePath, routePath);
  }
}
</script>
<style lang="scss" scoped>
.el-menu {
  border: none;
  height: 100%;
  flex: 1 1 0%;
  display: flex;
  .el-menu-item {
    color: $text;
    position: relative;
    height: $menuItemHeight;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 0;
    &::after {
      content: "";
      left: 20px;
      right: 20px;
      height: 2px;
      display: block;
      background: transparent;
      transition: background 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      position: absolute;
      bottom: 0;
    }
    &.is-active,
    &:hover {
      color: var(--theme-color) !important;
      background: transparent;
      &::after {
        background: currentColor;
      }
    }
  }
}
.svg-icon {
  margin-right: 10px;
}
</style>
