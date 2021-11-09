<template>
  <div
    v-if="item && (!item.meta || !item.meta.hidden)"
    :class="[
      isCollapse ? 'simple-mode' : 'full-mode',
      { 'first-level': isFirstLevel },
    ]"
  >
    <template
      v-if="!alwaysShowRootMenu && theOnlyOneChild && !theOnlyOneChild.children"
    >
      <router-link
        v-if="theOnlyOneChild.meta"
        :to="resolvePath(theOnlyOneChild.path)"
      >
        <el-menu-item
          :index="resolvePath(theOnlyOneChild.path)"
          :class="{ 'submenu-title-noDropdown': isFirstLevel }"
        >
          <svg-icon
            v-if="theOnlyOneChild.meta.icon"
            :name="theOnlyOneChild.meta.icon"
          />
          <span v-if="theOnlyOneChild.meta.title" slot="title">{{
            theOnlyOneChild.meta.title
          }}</span>
        </el-menu-item>
      </router-link>
    </template>
    <el-submenu v-else :index="resolvePath(item.path)" popper-append-to-body>
      <template slot="title">
        <svg-icon v-if="item.meta && item.meta.icon" :name="item.meta.icon" />
        <span v-if="item.meta && item.meta.title" slot="title">{{
          item.meta.title
        }}</span>
      </template>
      <template v-if="item.children">
        <sidebar-item
          v-for="child in item.children"
          :key="child.path"
          :value="child"
          :is-collapse="isCollapse"
          :is-first-level="false"
          :base-path="resolvePath(child.path)"
          class="nest-menu"
        />
      </template>
    </el-submenu>
  </div>
</template>

<script lang="ts">
import { resolve } from "@/utils/path";
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { RouteConfig } from "vue-router";
import SidebarItemLink from "./SidebarItemLink.vue";

@Component({
  // Set 'name' here to prevent uglifyjs from causing recursive component not work
  // See https://medium.com/haiiro-io/element-component-name-with-vue-class-component-f3b435656561 for detail
  name: "SidebarItem",
  components: {
    SidebarItemLink,
  },
})
export default class extends Vue {
  @Prop({ required: true }) value!: RouteConfig;
  @Prop({ default: false }) isCollapse!: boolean;
  @Prop({ default: true }) isFirstLevel!: boolean;
  @Prop({ default: "" }) private basePath!: string;
  item: RouteConfig;

  @Watch("data", { immediate: true })
  onDataChange() {
    this.item = JSON.parse(JSON.stringify(this.value));
  }

  get alwaysShowRootMenu() {
    if (this.item.meta && this.item.meta.alwaysShow) {
      return true;
    }
    return false;
  }

  get showingChildNumber() {
    if (this.item.children) {
      const showingChildren = this.item.children.filter((item) => {
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

  get theOnlyOneChild() {
    if (this.showingChildNumber > 1) {
      return null;
    }
    if (this.item.children) {
      for (const child of this.item.children) {
        if (!child.meta || !child.meta.hidden) {
          //如果只有有个子路路由，子路由等级提升，继承父路由icon
          child.meta = child.meta || {};
          child.meta.icon = child.meta.icon || (this.item.meta || {}).icon;
          return child;
        }
      }
    }
    // If there is no children, return itself with path removed,
    // because this.basePath already conatins item's path information
    return { ...this.item, path: "" };
  }

  resolvePath(routePath: string) {
    return resolve(this.basePath, routePath);
  }
}
</script>

<style lang="scss">
// .el-submenu.is-active,
.el-submenu.is-active > .el-submenu__title {
  color: $subMenuActiveText;
  color: var(--theme-color);
}
.el-submenu__title i {
  color: $menuText;
  font-weight: bolder;
}
.full-mode {
  .el-submenu .el-menu-item:not(.is-active),
  .el-submenu .el-menu-item:not(.is-active):hover {
    // min-width: $sideBarWidth !important;
    background-color: $subMenuBg;
  }
  .el-submenu > .el-submenu__title:hover,
  .el-menu-item.submenu-title-noDropdown:not(.is-active):hover {
    background-color: $menuBg;
  }
  .el-menu-item,
  .el-submenu__title {
    display: flex;
    align-items: center;
    transition: color 0.3s;
    &:hover {
      color: var(--theme-color);
    }
  }

  .el-menu-item {
    &::after {
      position: absolute;
      top: 4px;
      right: 0;
      bottom: 4px;
      border-right: 4px solid currentColor;
      transform: scaleY(0.0001);
      opacity: 0;
      transition: transform 0.15s cubic-bezier(0.215, 0.61, 0.355, 1),
        opacity 0.15s cubic-bezier(0.215, 0.61, 0.355, 1);
      content: "";
    }
    &.is-active {
      background-color: $subMenuHover;
      background-color: var(--theme-color-tint, $subMenuHover);
      &::after {
        transform: scaleY(1);
        opacity: 1;
        transition: transform 0.15s cubic-bezier(0.645, 0.045, 0.355, 1),
          opacity 0.15s cubic-bezier(0.645, 0.045, 0.355, 1);
      }
    }
  }
}

.simple-mode {
  &.first-level {
    .submenu-title-noDropdown {
      padding: 0 !important;
      position: relative;

      .el-tooltip {
        padding: 0 !important;
      }
    }

    .el-submenu {
      overflow: hidden;

      & > .el-submenu__title {
        padding: 0px !important;

        .el-submenu__icon-arrow {
          display: none;
        }

        & > span {
          visibility: hidden;
        }
      }
    }
  }
}
.default-menu.el-menu .full-mode {
  .el-submenu.is-active > .el-submenu__title,
  .el-submenu__title:hover,
  .el-menu-item:hover,
  .el-menu-item.is-active {
    color: $menuActiveText !important;
  }
  .el-menu-item.is-active {
    background-color: $subMenuHover;
  }
}
</style>

<style lang="scss" scoped>
.svg-icon {
  margin-right: 16px;
}

.simple-mode {
  .svg-icon {
    margin-left: 20px;
  }
}
</style>
