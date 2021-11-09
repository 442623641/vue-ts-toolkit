<template>
  <div id="tags-view-container" class="vab-tabs">
    <el-tabs
      type="card"
      v-model="activeName"
      @tab-click="onClick"
      class="vab-tabs-content-smooth vab-tabs-content"
      @tab-remove="closeSelectedTag"
    >
      <el-tab-pane
        ref="tag"
        :key="tag.fullPath"
        v-for="tag in visitedViews"
        :closable="!isAffix(tag)"
        :name="tag.fullPath"
      >
        <span
          slot="label"
          @contextmenu.prevent="openMenu(tag.fullPath, $event)"
          >{{ tag.meta.title }}</span
        >
      </el-tab-pane>
    </el-tabs>
    <ul
      v-if="selectedTag"
      v-show="visible"
      :style="{ left: left + 'px', top: top + 'px' }"
      class="contextmenu"
    >
      <li @click="refreshSelectedTag">刷新</li>
      <li v-if="!isAffix(selectedTag)" @click="closeSelectedTag">关闭</li>
      <li @click="closeOthersTags">关闭其它</li>
      <li @click="closeAllTags">关闭所有</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { RouteConfig } from "vue-router";
import { PermissionModule } from "@/store/modules/permission.store";
import { TagsViewModule, ITagView } from "@/store/modules/tags-view.store";
import { resolve } from "@/utils/path";
@Component({
  name: "TagsView",
  components: {},
})
export default class extends Vue {
  visible = false;
  top = 0;
  left = 0;
  private affixTags: ITagView[] = [];
  activeName: any = "";
  get visitedViews() {
    return TagsViewModule.visitedViews;
  }

  get selectedTag() {
    return (
      TagsViewModule.visitedViews.find(
        (v) => v.fullPath == this.$route.fullPath
      ) || TagsViewModule.visitedViews[0]
    );
  }

  get routes() {
    return PermissionModule.routes;
  }

  @Watch("$route")
  onRouteChange() {
    this.addTags();
  }

  @Watch("visible")
  onVisibleChange(value: boolean) {
    if (value) {
      document.body.addEventListener("click", this.closeMenu);
    } else {
      document.body.removeEventListener("click", this.closeMenu);
    }
  }

  mounted() {
    this.initTags();
    this.addTags();
  }

  onClick(tab) {
    let { path, query } = this.visitedViews[tab.index];
    this.$router.push({ path, query }).catch((ex) => ex);
  }

  isAffix(tag: ITagView) {
    return tag.meta && tag.meta.affix;
  }

  private filterAffixTags(routes: RouteConfig[], basePath = "/") {
    let tags: ITagView[] = [];
    routes.forEach((route) => {
      if (route.meta && route.meta.affix) {
        const tagPath = resolve(basePath, route.path);
        tags.push({
          fullPath: tagPath,
          path: tagPath,
          name: route.name,
          meta: { ...route.meta },
        });
      }
      if (route.children) {
        const childTags = this.filterAffixTags(route.children, route.path);
        if (childTags.length >= 1) {
          tags = [...tags, ...childTags];
        }
      }
    });
    return tags;
  }

  private initTags() {
    this.affixTags = this.filterAffixTags(this.routes);
    for (const tag of this.affixTags) {
      // Must have tag name
      if (tag.name) {
        TagsViewModule.addVisitedView(tag);
      }
    }
  }

  private addTags() {
    const { name } = this.$route;
    if (name) {
      TagsViewModule.addView(this.$route);
    }
    this.activeName = this.$route.fullPath;
    TagsViewModule.visitedViews.some(
      (v) => v.fullPath == this.$route.fullPath
    ) || TagsViewModule.updateVisitedView(this.$route);
    return false;
  }

  refreshSelectedTag() {
    const view = this.selectedTag;
    TagsViewModule.delCachedView(view);
    const { fullPath } = view;
    this.$nextTick(() => {
      this.$router
        .replace({
          path: "/redirect" + fullPath,
        })
        .catch((err) => {
          console.warn(err);
        });
    });
  }

  closeSelectedTag(tabName: string) {
    const view: any = TagsViewModule.visitedViews.find(
      (v) => v.fullPath == tabName
    );
    TagsViewModule.delView(view);
    if (view.path === this.$route.path) {
      this.toLastView(TagsViewModule.visitedViews, view);
    }
  }

  closeOthersTags() {
    if (
      this.selectedTag.fullPath !== this.$route.path &&
      this.selectedTag.fullPath !== undefined
    ) {
      this.$router.push(this.selectedTag.fullPath).catch((err) => {
        console.warn(err);
      });
    }
    TagsViewModule.delOthersViews(this.selectedTag);
  }

  closeAllTags() {
    const view = this.selectedTag;
    TagsViewModule.delAllViews();
    if (this.affixTags.some((tag) => tag.path === this.$route.path)) {
      return;
    }
    this.toLastView(TagsViewModule.visitedViews, view);
  }

  private toLastView(visitedViews: ITagView[], view: ITagView) {
    const latestView = visitedViews.slice(-1)[0];
    if (latestView !== undefined && latestView.fullPath !== undefined) {
      this.$router.push(latestView.fullPath).catch((err) => {
        console.warn(err);
      });
    } else {
      // Default redirect to the home page if there is no tags-view, adjust it if you want
      if (view.name === "Dashboard") {
        // to reload home page
        this.$router
          .replace({ path: "/redirect" + view.fullPath })
          .catch((err) => {
            console.warn(err);
          });
      } else {
        this.$router.push("/").catch((err) => {
          console.warn(err);
        });
      }
    }
  }

  openMenu(tab: any, e: MouseEvent) {
    const menuMinWidth = 105;
    const offsetLeft = this.$el.getBoundingClientRect().left; // container margin left
    const offsetWidth = (this.$el as HTMLElement).offsetWidth; // container width
    const maxLeft = offsetWidth - menuMinWidth; // left boundary
    const left = e.clientX - offsetLeft + 15; // 15: margin right
    if (left > maxLeft) {
      this.left = maxLeft;
    } else {
      this.left = left;
    }
    this.top = e.clientY;
    this.visible = true;
    this.activeName = tab;
    // this.selectedTag = tag;
  }

  private closeMenu() {
    this.visible = false;
  }
}
</script>

<style lang="scss">
// Reset element css of el-icon-close
.vab-tabs {
  position: relative;
  /* box-sizing: border-box; */
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  padding-right: 20px;
  padding-left: 20px;

  user-select: none;
  background: #fff;
  border-top: 1px solid #f6f6f6;

  .fold-unfold {
    margin-right: 20px;
  }

  .vab-tabs-content {
    width: 100%;
  }
  .vab-tabs-content-smooth {
    height: 38px;

    .el-tabs__nav-next,
    .el-tabs__nav-prev {
      height: 38px;
      line-height: 38px;
    }

    .el-tabs__header {
      border-bottom: 0;

      .el-tabs__nav {
        border: 0;
      }

      .el-tabs__item {
        height: 38px;
        padding: 0 30px 0 30px !important;
        margin-top: 6px;
        margin-right: -18px;
        line-height: 38px;
        text-align: center;
        border: 0;
        transition: padding 0.3s cubic-bezier(0.645, 0.045, 0.355, 1) !important;
        &.is-active,
        &.is-active:hover {
          color: var(--theme-color);
          background: #e8f4ff; //rgba($primary, 0.1);
          background: var(--theme-color-tint);
        }

        &.is-active,
        &.is-active:hover,
        &:hover {
          padding: 0 30px 0 30px;
          mask: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANoAAAAkBAMAAAAdqzmBAAAAMFBMVEVHcEwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlTPQ5AAAAD3RSTlMAr3DvEM8wgCBA379gj5//tJBPAAAAnUlEQVRIx2NgAAM27fj/tAO/xBsYkIHyf9qCT8iWMf6nNQhAsk2f5rYheY7Dnua2/U+A28ZEe8v+F9Ax2v7/F4DbxkUH2wzgtvHTwbYPo7aN2jZq26hto7aN2jZq25Cy7Qvctnw62PYNbls9HWz7S8/G6//PsI6H4396gAUQy1je08W2jxDbpv6nD4gB2uWp+J9eYPsEhv/0BPS1DQBvoBLVZ3BppgAAAABJRU5ErkJggg==);
          mask-size: 100% 100%;
        }

        &:hover {
          color: #515a6e;
          background: #dee1e6;
        }
      }
    }
  }
  .more {
    display: flex;
    align-content: center;
    align-items: center;
    cursor: pointer;
  }
}
</style>
<style lang="scss" scoped>
.contextmenu {
  margin: 0;
  background: #fff;
  z-index: 3000;
  position: absolute;
  list-style-type: none;
  padding: 5px 0;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 400;
  color: #333;
  box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);

  li {
    margin: 0;
    padding: 7px 16px;
    cursor: pointer;

    &:hover {
      background: #eee;
    }
  }
}
</style>
