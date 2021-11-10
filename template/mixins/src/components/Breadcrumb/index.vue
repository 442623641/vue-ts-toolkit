<template>
  <el-breadcrumb class="app-breadcrumb" separator-class="el-icon-arrow-right">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in breadcrumbs" :key="item.path">
        <span
          v-if="
            item.redirect === 'noredirect' || index === breadcrumbs.length - 1
          "
          class="no-redirect"
          ><svg-icon v-if="item.meta.icon" :name="item.meta.icon" />
          {{ item.meta.title }}</span
        >
        <a v-else @click.prevent="handleLink(item)">
          <svg-icon v-if="item.meta.icon" :name="item.meta.icon" />
          {{ item.meta.title }}</a
        >
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script lang="ts">
import { compile } from "path-to-regexp";
import { Component, Vue, Watch } from "vue-property-decorator";
import { RouteRecord, Route } from "vue-router";

@Component({
  name: "Breadcrumb",
})
export default class extends Vue {
  breadcrumbs: RouteRecord[] = [];

  @Watch("$route")
  private onRouteChange(route: Route) {
    // if you go to the redirect page, do not update the breadcrumbs
    if (route.path.startsWith("/redirect/")) {
      return;
    }
    this.getBreadcrumb();
  }

  created() {
    this.getBreadcrumb();
  }

  private getBreadcrumb() {
    const matched = this.$route.matched.filter(
      (item) => item.meta && item.meta.title
    );
    const first = matched[0];
    // if (!this.isDashboard(first)) {
    //   matched = [
    //     (<any>{ path: "/dashboard", meta: { title: "首页" } }) as RouteRecord,
    //   ].concat(matched);
    // }
    this.breadcrumbs = matched.filter((item) => {
      return item.meta && item.meta.title && item.meta.breadcrumb !== false;
    });
  }

  private isDashboard(route: RouteRecord) {
    const name = route && route.name;
    if (!name) {
      return false;
    }
    return name.trim().toLocaleLowerCase() === "Dashboard".toLocaleLowerCase();
  }

  private pathCompile(path: string) {
    // To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
    const { params } = this.$route;
    const toPath = compile(path);
    return toPath(params);
  }

  handleLink(item: any) {
    const { redirect, path } = item;
    if (redirect) {
      this.$router.push(redirect).catch((err) => {
        console.warn(err);
      });
      return;
    }
    this.$router.push(this.pathCompile(path)).catch((err) => {
      console.warn(err);
    });
  }
}
</script>

<style lang="scss" scoped>
.el-breadcrumb__inner,
.el-breadcrumb__inner a {
  font-weight: 400 !important;
  color: $navbarText;
}

.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  .no-redirect {
    color: #97a8be;
    color: rgba($color: $navbarText, $alpha: 0.7);
    cursor: text;
  }
}
</style>
