<template>
  <div :class="{ 'has-logo': showLogo }">
    <sidebar-logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :class="{ 'default-menu': !sidebarTextTheme }"
        :default-active="activeMenu"
        :collapse="isCollapse"
        :unique-opened="true"
        :collapse-transition="true"
        mode="vertical"
      >
        <sidebar-item
          v-for="route in routes"
          :key="route.path"
          :value="route"
          :base-path="route.path"
          :is-collapse="isCollapse"
        />
      </el-menu>
    </el-scrollbar>
    <div border-top class="setting-container">
      <hamburger :is-active="sidebar.opened" @toggle-click="toggleSideBar" />
      <el-button
        @click="openSettingsModal"
        style="padding-right: 16px; font-size: 18px; color: #666"
        type="text"
        icon="el-icon-setting"
      ></el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { AppModule } from "@/store/modules/app.store";
import { PermissionModule } from "@/store/modules/permission.store";
import { SettingsModule } from "@/store/modules/settings.store";
import SidebarItem from "./SidebarItem.vue";
import SidebarLogo from "./SidebarLogo.vue";
import Hamburger from "@/components/Hamburger/index.vue";
import { SettingsModal } from "@/modals";
@Component({
  name: "SideBar",
  components: {
    SidebarItem,
    SidebarLogo,
    Hamburger
  },
})
export default class extends Vue {
  visible = false;
  toggleSideBar() {
    AppModule.ToggleSideBar(false);
  }

  get sidebar() {
    return AppModule.sidebar;
  }

  get routes() {
    return PermissionModule.routes;
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
    return path;
  }

  get isCollapse() {
    return !AppModule.sidebar.opened;
  }
  openSettingsModal() {
    this.$modal.create(SettingsModal, {}, { closeOnClickModal: true }).present();
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

  .scrollbar-wrapper {
    overflow-x: hidden !important;
  }

  .el-scrollbar__view {
    height: 100%;
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
  height: 50px;
  line-height: 50px;
  padding-left: 18px;
}

.el-menu {
  border: none;
  height: 100%;
  width: 100% !important;
}
</style>
