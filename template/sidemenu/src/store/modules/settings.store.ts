import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators'
import store from '@/store'
import elementVariables from '@/styles/element-variables.scss'
import { SETTINGS } from '@/class/constant'
import { updateColor } from '@/utils/updateColor';
const initColor = (key = 'theme') => {
  let color = localStorage.getItem(`static_settings_${key}`);
  color && color != elementVariables.theme && updateColor(color);
  return color || elementVariables.theme;
}
const getSettingBoolean = (key) => {
  let value = eval(localStorage.getItem(`static_settings_${key}`));
  return value === false ? value : SETTINGS[key]
}

export interface ISettingsState {
  theme: string
  fixedHeader: boolean
  showSettings: boolean
  showTagsView: boolean
  showSidebarLogo: boolean
  sidebarTextTheme: boolean
}

@Module({ dynamic: true, store, name: 'settings' })
class Settings extends VuexModule implements ISettingsState {
  public theme = initColor();
  public fixedHeader = getSettingBoolean('fixedHeader')
  public showSettings = getSettingBoolean('showSettings')
  public showTagsView = getSettingBoolean('showTagsView')
  public showSidebarLogo = getSettingBoolean('showSidebarLogo')
  public sidebarTextTheme = getSettingBoolean('sidebarTextTheme')

  @Mutation
  private CHANGE_SETTING(payload: { key: string, value: any }) {
    const { key, value } = payload
    if (Object.prototype.hasOwnProperty.call(this, key)) {
      (this as any)[key] = value
      localStorage.setItem(`static_settings_${key}`, value);
    }
  }

  @Action
  public ChangeSetting(payload: { key: string, value: any }) {
    this.CHANGE_SETTING(payload)
  }
}

export const SettingsModule = getModule(Settings)
