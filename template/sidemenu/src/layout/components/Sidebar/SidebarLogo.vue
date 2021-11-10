<template>
  <div class="sidebar-logo-container" :class="{ collapse: collapse }">
    <router-link key="expand" class="sidebar-logo-link" to="">
      <img src="favicon.ico" class="sidebar-logo" />
      <i
        style="
          font-size: 16px;
          font-weight: bolder;
          color: #fff;
          white-space: nowrap;
          margin-left: 5px;
        "
        >Typescript Memu</i
      >
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
    min-height: 30px;
    & .sidebar-logo {
      height: 27px;
      vertical-align: middle;
    }
  }

  &.collapse {
    i {
      display: none;
    }
  }
}
</style>
