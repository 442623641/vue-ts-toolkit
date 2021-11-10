<template>
  <div class="navbar">
    <div class="sidebar-logo-container" v-if="showLogo">
      <img style="height: 30px" src="favicon.ico" class="sidebar-logo" />
      <i style="font-size: 16px; font-weight: bolder; margin-left: 5px"
        >Typescript Tabs</i
      >
    </div>
    <HeadNavbar />

    <header-search redirect="users-page" margin-right-20 class="hover-effect" />
    <router-link to="/" margin-right-20 class="hover-effect">
      <svg-icon name="size"></svg-icon
    ></router-link>
    <el-dropdown class="hover-effect" trigger="click">
      <div class="avatar-wrapper" flex-center>
        <el-avatar
          margin-right-10
          style="width: 24px; height: 24px; line-height: 24px"
          src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png"
        ></el-avatar
        ><span style="font-size: 12px">{{ userInfo.name }}</span>
      </div>
      <el-dropdown-menu slot="dropdown">
        <router-link to="/profile">
          <el-dropdown-item> 个人中心 </el-dropdown-item>
        </router-link>

        <a
          target="_blank"
          href="https://github.com/armour/vue-typescript-admin-template/"
        >
          <el-dropdown-item> Github </el-dropdown-item>
        </a>
        <div @click="openSettingsModal">
          <el-dropdown-item>设 置</el-dropdown-item>
        </div>
        <el-dropdown-item divided>
          <span style="display: block" @click="logout">退 出</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { AppModule } from "@/store/modules/app.store";
import { UserModule } from "@/store/modules/user.store";
import Breadcrumb from "@/components/Breadcrumb/index.vue";
import HeadNavbar from "../HeadNavbar/index.vue";
import HeaderSearch from "@/components/HeaderSearch/HeaderSearch.vue";
import { SettingsModal } from "@/modals";
import { SettingsModule } from "@/store/modules/settings.store";
@Component({
  name: "Navbar",
  components: {
    Breadcrumb,
    HeaderSearch,
    HeadNavbar,
  },
})
export default class extends Vue {
  get showLogo() {
    return SettingsModule.showSidebarLogo;
  }

  get sidebar() {
    return AppModule.sidebar;
  }

  get device() {
    return AppModule.device.toString();
  }

  get userInfo() {
    return UserModule.userInfo;
  }

  openSettingsModal() {
    this.$modal
      .create(SettingsModal, {}, { closeOnClickModal: true })
      .present();
  }
  async logout() {
    await UserModule.LogOut();
    this.$router.push(`/login`).catch((err) => {
      console.warn(err);
    });
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 48px;
  padding: 0 16px;
  overflow: hidden;
  position: relative;
  background: #fff;
  background: $navbarBg;
  background: var(--theme-color-shade, $navbarBg);
}
.sidebar-logo-container {
  min-width: 192px;
  position: relative;
  text-align: left;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.hover-effect {
  cursor: pointer;
  transition: color 0.3s;

  &:hover {
    color: rgba($navbarText, 0.5);
  }
}
</style>
