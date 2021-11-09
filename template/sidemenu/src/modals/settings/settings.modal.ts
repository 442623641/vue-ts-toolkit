import { Component, Vue } from 'vue-property-decorator'
import { SettingsModule } from "@/store/modules/settings.store";
import ThemePicker from "@/components/ThemePicker/index.vue";

@Component({
  name: "settings-modal",
  components: {
    ThemePicker,
  },
})
export default class extends Vue {
  get fixedHeader() {
    return SettingsModule.fixedHeader;
  }

  set fixedHeader(value) {
    SettingsModule.ChangeSetting({ key: "fixedHeader", value });
  }

  get showTagsView() {
    return SettingsModule.showTagsView;
  }

  set showTagsView(value) {
    SettingsModule.ChangeSetting({ key: "showTagsView", value });
  }

  get showSidebarLogo() {
    return SettingsModule.showSidebarLogo;
  }

  set showSidebarLogo(value) {
    SettingsModule.ChangeSetting({ key: "showSidebarLogo", value });
  }

  get sidebarTextTheme() {
    return SettingsModule.sidebarTextTheme;
  }

  set sidebarTextTheme(value) {
    SettingsModule.ChangeSetting({ key: "sidebarTextTheme", value });
  }

  themeChange(value: string) {
    SettingsModule.ChangeSetting({ key: "theme", value });
  }
}