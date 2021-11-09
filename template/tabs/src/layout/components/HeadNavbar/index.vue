<template>
  <el-menu
    :default-active="activeMenu"
    :collapse-transition="true"
    mode="horizontal"
  >
    <sidebar-item
      v-for="route in routes"
      :key="route.path"
      :value="route"
      :base-path="route.path"
    />
  </el-menu>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { AppModule } from "@/store/modules/app.store";
import { PermissionModule } from "@/store/modules/permission.store";
import { SettingsModule } from "@/store/modules/settings.store";
import SidebarItem from "./SidebarItem.vue";
import Hamburger from "@/components/Hamburger/index.vue";
import { SettingsModal } from "@/modals";
@Component({
  name: "HeadNavbar",
  components: {
    SidebarItem,
    Hamburger,
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
    this.$modal
      .create(SettingsModal, {}, { closeOnClickModal: true })
      .present();
  }
}
</script>

<style lang="scss">
.sidebar-container {
  // reset element-ui css
  user-select: none;
  display: flex;
  flex-direction: column;
}
</style>

<style lang="scss" scoped>
.el-menu {
  border: none;
  height: 100%;
  flex: 1 1 0%;
  display: flex;
}
</style>
