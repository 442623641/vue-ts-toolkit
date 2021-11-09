<template>
  <div ref="collapse" class="collapse" :class="{ expand: isActive }">
    <div class="collapse-title flex-between">
      <slot name="title"></slot>
      <el-button
        @click="isActive = !isActive"
        class="collapse-button"
        margin-left-20
        type="text"
        >{{ isActive ? "收起" : "展开"
        }}<i class="el-icon-arrow-up el-icon--right"></i
      ></el-button>
    </div>
    <transition
      name="fade"
      @enter="(el) => (el.style.height = contentHeight)"
      @afterEnter="(el) => (el.style.height = '')"
      @leave="(el) => (el.style.height = el.offsetHeight - 1 + 'px')"
    >
      <div
        ref="collapseContent"
        v-if="isActive || showContent"
        class="collapse-content"
      >
        <slot></slot>
      </div>
    </transition>
  </div>
</template>
<script src="./Collapse.ts" lang="ts"></script>
<style src="./Collapse.scss" lang="scss" scoped></style>
