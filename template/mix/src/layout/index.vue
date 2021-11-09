<template>
  <div :class="classObj" class="app-wrapper">
    <div
      v-if="classObj.mobile && sidebar.opened"
      class="drawer-bg"
      @click="handleClickOutside"
    />
    <div
      :class="{ 'fixed-header': fixedHeader}"
      class="nav-header"
    >
      <navbar />
    </div>
    <app-main />
  </div>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import { mixins } from "vue-class-component";
import { DeviceType, AppModule } from "@/store/modules/app.store";
import { SettingsModule } from "@/store/modules/settings.store";
import { AppMain, Navbar } from "./components";
import ResizeMixin from "./mixin/resize";

@Component({
  name: "Layout",
  components: {
    AppMain,
    Navbar,
  },
})
export default class extends mixins(ResizeMixin) {
  get classObj() {
    return {
      hideSidebar: !this.sidebar.opened,
      openSidebar: this.sidebar.opened,
      withoutAnimation: this.sidebar.withoutAnimation,
      mobile: this.device === DeviceType.Mobile,
    };
  }

  get fixedHeader() {
    return SettingsModule.fixedHeader;
  }

  handleClickOutside() {
    AppModule.CloseSideBar(false);
  }
}
</script>

<style lang="scss" scoped>
.app-wrapper {
  background-color: $bg;
  min-height: 100vh;
  &:after {
    content: "";
    display: table;
    clear: both;
  }
}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.sidebar-container {
  transition: width 0.28s;
  width: $sideBarWidth !important;
  height: 100%;
  position: fixed;
  font-size: 0px;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1001;
  overflow: hidden;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: 100%;
}
.nav-header {
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
}

/* for mobile response 适配移动端 */
.mobile {
  .main-container {
    margin-left: 0px;
  }

  .sidebar-container {
    transition: transform 0.28s;
    width: $sideBarWidth !important;
  }

  &.openSidebar {
    position: fixed;
    top: 0;
  }

  &.hideSidebar {
    .sidebar-container {
      pointer-events: none;
      transition-duration: 0.3s;
      transform: translate3d(-$sideBarWidth, 0, 0);
    }
  }

  .fixed-header {
    width: 100%;
  }
}

.withoutAnimation {
  .main-container,
  .sidebar-container {
    transition: none;
  }
}
</style>
