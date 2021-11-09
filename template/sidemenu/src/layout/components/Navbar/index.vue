<template>
  <div class="navbar">
    <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
    <div class="right-menu">
      <header-search redirect="users-page" class="right-menu-item" />
      <router-link
        to="/profile"
        class="avatar-wrapper right-menu-item hover-effect"
      >
        <el-avatar
          style="width: 20px; height: 20px; line-height: 20px"
          src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
        ></el-avatar>
        &nbsp;&nbsp;{{ userInfo.name }}
      </router-link>
      <el-divider direction="vertical"></el-divider>
      <el-link
        class="right-menu-item hover-effect"
        size="small"
        @click.native="logout"
        type="danger"
        :underline="false"
        margin-right-32
        ><i class="el-icon-switch-button el-icon--left"></i
        ><span style="font-weight: 300">退 出</span></el-link
      >
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { AppModule } from "@/store/modules/app.store";
import { UserModule } from "@/store/modules/user.store";
import Breadcrumb from "@/components/Breadcrumb/index.vue";
import HeaderSearch from "@/components/HeaderSearch/HeaderSearch.vue";
@Component({
  name: "Navbar",
  components: {
    Breadcrumb,
    HeaderSearch,
  },
})
export default class extends Vue {
  get sidebar() {
    return AppModule.sidebar;
  }

  get device() {
    return AppModule.device.toString();
  }

  get userInfo() {
    return UserModule.userInfo;
  }

  toggleSideBar() {
    AppModule.ToggleSideBar(false);
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
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  background: $navbarBg;
  background: var(--theme-color-shade, $navbarBg);
  // background: linear-gradient(to left,rgba(80, 103, 218, 1), rgba(84, 113, 228, 1));
  // box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    padding: 0 15px;

    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;
    display: flex;
    align-items: center;
    &:focus {
      outline: none;
    }
    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      // font-size: 18px;
      color: #5a5e66;
      color: $navbarText;
      &.hover-effect {
        cursor: pointer;
        transition: color 0.3s;

        &:hover {
          color: rgba($navbarText, 0.5);
        }
      }
    }

    // .avatar-container {
    //   margin-right: 30px;

    .avatar-wrapper {
      // margin-top: 5px;
      margin-left: 10px;
      // margin-right: 30px;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    // }
  }
}
</style>
