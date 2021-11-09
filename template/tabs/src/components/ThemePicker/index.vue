<template>
  <div class="theme-picker">
    <el-tooltip
      v-for="item in colors"
      :key="item.value"
      effect="dark"
      :content="item.text"
      placement="top"
    >
      <div
        @click="onClick(item.value)"
        class="theme-color-block"
        :style="{ backgroundColor: item.value }"
      >
        <i v-if="theme == item.value" class="el-icon-check"></i>
      </div>
    </el-tooltip>
    <el-tooltip effect="dark" content="其它（自定义）" placement="top">
      <el-color-picker
        :value="theme"
        @change="onClick"
        :predefine="[
          '#409EFF',
          '#1890ff',
          '#304156',
          '#212121',
          '#11a983',
          '#13c2c2',
          '#6959CD',
          '#f5222d',
        ]"
        class="theme-picker theme-color-block"
        popper-class="theme-picker-dropdown"
      />
    </el-tooltip>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { SettingsModule } from "@/store/modules/settings.store";
import { updateColor } from "@/utils/updateColor";
import { THEME_COLORS } from "@/types/constant";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const version = require("element-ui/package.json").version; // element-ui version from node_modules
const ORIGINAL_THEME = "#409EFF"; // default color

@Component({
  name: "ThemePicker",
})
export default class extends Vue {
  private chalk = ""; // The content of theme-chalk css
  private theme = "";
  colors = THEME_COLORS;
  get defaultTheme() {
    return SettingsModule.theme;
  }

  @Watch("defaultTheme", { immediate: true })
  private onDefaultThemeChange(value: string) {
    this.theme = value;
  }
  async onClick(value?) {
    if (this.theme != value) {
      this.theme = value;
      await updateColor(value);
      this.$emit("change", value);
    }
  }
  // @Watch("theme")
  private async onThemeChange(value: string) {
    if (!value) return;
    const oldValue = this.chalk ? this.theme : ORIGINAL_THEME;
    const themeCluster = this.getThemeCluster(value.replace("#", ""));
    const originalCluster = this.getThemeCluster(oldValue.replace("#", ""));
    const message = this.$message({
      message: "  Compiling the theme",
      customClass: "theme-message",
      type: "success",
      duration: 0,
      iconClass: "el-icon-loading",
    });

    if (!this.chalk) {
      const url = `https://unpkg.com/element-ui@${version}/lib/theme-chalk/index.css`;
      await this.getCSSString(url, "chalk");
    }

    const getHandler = (variable: string, id: string) => {
      return () => {
        const originalCluster = this.getThemeCluster(
          ORIGINAL_THEME.replace("#", "")
        );
        const newStyle = this.updateStyle(
          (this as any)[variable],
          originalCluster,
          themeCluster
        );

        let styleTag = document.getElementById(id);
        if (!styleTag) {
          styleTag = document.createElement("style");
          styleTag.setAttribute("id", id);
          document.head.appendChild(styleTag);
        }
        styleTag.innerText = newStyle;
      };
    };
    const chalkHandler = getHandler("chalk", "chalk-style");
    chalkHandler();

    let styles: HTMLElement[] = [].slice.call(
      document.querySelectorAll("style")
    );
    styles = styles.filter((style) => {
      const text = style.innerText;
      return (
        new RegExp(oldValue, "i").test(text) && !/Chalk Variables/.test(text)
      );
    });
    styles.forEach((style) => {
      const { innerText } = style;
      if (typeof innerText !== "string") return;
      style.innerText = this.updateStyle(
        innerText,
        originalCluster,
        themeCluster
      );
    });

    this.$emit("change", value);
    message.close();
  }

  private updateStyle(
    style: string,
    oldCluster: string[],
    newCluster: string[]
  ) {
    let newStyle = style;
    oldCluster.forEach((color, index) => {
      newStyle = newStyle.replace(new RegExp(color, "ig"), newCluster[index]);
    });
    return newStyle;
  }

  private getCSSString(url: string, variable: string) {
    return new Promise((resolve) => {
      const xhr = new XMLHttpRequest();
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
          (this as any)[variable] = xhr.responseText.replace(
            /@font-face{[^}]+}/,
            ""
          );
          resolve(null);
        }
      };
      xhr.open("GET", url);
      xhr.send();
    });
  }

  private getThemeCluster(theme: string) {
    const tintColor = (color: string, tint: number) => {
      let red = parseInt(color.slice(0, 2), 16);
      let green = parseInt(color.slice(2, 4), 16);
      let blue = parseInt(color.slice(4, 6), 16);
      if (tint === 0) {
        // when primary color is in its rgb space
        return [red, green, blue].join(",");
      } else {
        red += Math.round(tint * (255 - red));
        green += Math.round(tint * (255 - green));
        blue += Math.round(tint * (255 - blue));
        return `#${red.toString(16)}${green.toString(16)}${blue.toString(16)}`;
      }
    };

    const shadeColor = (color: string, shade: number) => {
      let red = parseInt(color.slice(0, 2), 16);
      let green = parseInt(color.slice(2, 4), 16);
      let blue = parseInt(color.slice(4, 6), 16);
      red = Math.round((1 - shade) * red);
      green = Math.round((1 - shade) * green);
      blue = Math.round((1 - shade) * blue);
      return `#${red.toString(16)}${green.toString(16)}${blue.toString(16)}`;
    };

    const clusters = [theme];
    for (let i = 0; i <= 9; i++) {
      clusters.push(tintColor(theme, Number((i / 10).toFixed(2))));
    }
    clusters.push(shadeColor(theme, 0.1));
    return clusters;
  }
}
</script>

<style lang="scss">
.theme-message,
.theme-picker-dropdown {
  z-index: 99999 !important;
}

.theme-picker {
  // margin-top: 5px !important;
  .el-color-picker__trigger {
    height: 21px !important;
    width: 100% !important;
    padding: 0;
    border: none;
  }
}

.theme-picker-dropdown .el-color-dropdown__link-btn {
  display: none;
}

.theme-color-block {
  float: left;
  width: 20px;
  height: 20px;
  margin-top: 8px;
  margin-right: 8px;
  color: #fff;
  font-weight: 700;
  text-align: center;
  border-radius: 2px;
  cursor: pointer;
}
</style>
