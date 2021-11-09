<template>
  <el-scrollbar
    wrap-class="scrollbar-wrapper"
    v-if="routes && routes.length > 1"
  >
    <el-menu
      :default-active="activeMenu"
      :unique-opened="true"
      :collapse-transition="true"
      mode="vertical"
    >
      <sidebar-item
        v-for="route in routes"
        :key="route.path"
        :value="route"
        :base-path="basePath"
      />
    </el-menu>
  </el-scrollbar>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { PermissionModule } from "@/store/modules/permission.store";
import SidebarItem from "./SidebarItem.vue";

@Component({
  name: "SideBar",
  components: {
    SidebarItem,
  },
})
export default class extends Vue {
  get basePath() {
    return PermissionModule.routes.find((v) =>
      this.$route.matched.map((x) => x.path).includes(v.path)
    )?.path;
  }
  get routes() {
    return PermissionModule.routes.find((v) =>
      this.$route.matched.map((x) => x.path).includes(v.path)
    )?.children;
  }

  get activeMenu() {
    const route = this.$route;
    const { meta, path } = route;
    // if set path, the sidebar will highlight the path you set
    if (meta.activeMenu) {
      return meta.activeMenu;
    }
    return path;
  }
}
</script>

<style lang="scss">
.sidebar-container {
  // reset element-ui css
  user-select: none;
  display: flex;
  flex-direction: column;
  .horizontal-collapse-transition {
    transition: 0s width ease-in-out, 0s padding-left ease-in-out,
      0s padding-right ease-in-out;
  }

  .el-scrollbar__view {
    height: 100%;
  }
  .el-menu {
    background-color: transparent;
  }

  .el-scrollbar__bar {
    &.is-vertical {
      right: 0px;
    }

    &.is-horizontal {
      display: none;
    }
  }
}
</style>

<style lang="scss" scoped>
.el-scrollbar {
  height: 100%;
}
.setting-container {
  justify-content: space-between;
  display: flex;
  align-items: center;
}
.hamburger-container {
  height: $menuItemHeight;
  line-height: $menuItemHeight;
  padding-left: 18px;
}

.el-menu {
  border: none;
  height: 100%;
  width: 100% !important;
}
</style>
