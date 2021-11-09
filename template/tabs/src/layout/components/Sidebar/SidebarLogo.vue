<template>
  <div class="sidebar-logo-container" :class="{ collapse: collapse }">
    <router-link key="expand" class="sidebar-logo-link" to="">
      <img src="@/assets/imgs/logo-white-full.png" class="sidebar-logo" />
      <img src="@/assets/imgs/logo-white.png" class="sidebar-logo" />
    </router-link>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
@Component({
  name: "SidebarLogo",
})
export default class extends Vue {
  @Prop({ required: true }) collapse!: boolean;
}
</script>

<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
  transition: all 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 50px;
  min-height: 50px;
  background: $navbarBg;
  background: var(--theme-color-shade, $navbarBg);

  overflow: hidden;
  padding: 10px 16px;
  & .sidebar-logo-link {
    display: flex;
    align-items: center;
    min-height: 32px;
    & .sidebar-logo {
      // width: 26px;
      height: 27px;

      vertical-align: middle;
      &:first-child {
        display: block;
        // width: 110px;
      }
      &:last-child {
        display: none;
      }
    }
  }

  &.collapse {
    .sidebar-logo {
      width: auto;
      &:first-child {
        display: none;
      }
      &:last-child {
        display: block;
      }
    }
  }
}
</style>
