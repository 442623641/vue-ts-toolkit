<template>
  <div
    class="hamburger"
    :class="[{ 'is-active': isActive }]"
    @click="toggleClick"
  >
    <svg-icon name="hamburger" width="20px!important" height="20px!important" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  name: "Hamburger",
})
export default class extends Vue {
  @Prop({ default: false }) isActive!: boolean;

  toggleClick() {
    this.$emit("toggle-click");
  }
}
</script>

<style lang="scss" scoped>
.hamburger {
  padding: 10px 18px;
}

.svg-icon {
  vertical-align: middle;
}

.is-active .svg-icon {
  transform: rotate(180deg);
}
</style>
