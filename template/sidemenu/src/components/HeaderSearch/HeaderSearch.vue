<template>
  <div
    id="header-search"
    :class="{ show: show }"
    class="HeaderSearch-component"
  >
    <svg-icon class="search-icon" name="search" @click.stop="click" />
    <el-input
      ref="headerSearchSelect"
      v-model="search"
      placeholder="输入关键字搜索"
      class="header-search-select"
      @change="patch"
    />
  </div>
</template>
<script src="./HeaderSearch.ts" lang="ts"></script>
<style src="./HeaderSearch.scss" lang="scss" scoped></style>
