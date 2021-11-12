import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators'
import { getToken, setToken, removeToken } from '@/utils/stroage'
import router, { resetRouter } from '@/router'
import { PermissionModule } from './permission.store'
import store from '@/store'
import { UsersService } from '@/services/users'
import { IUser } from '@/class/user'
import { USER_ROLES } from '@/class/constant'

export interface IUserState {
  token: string
  userInfo: IUser
  roles: string[]
}

@Module({ dynamic: true, store, name: 'user' })
class User extends VuexModule implements IUserState {
  public userInfo: IUser = <any>{}
  public token = getToken() || ''
  public roles: string[] = []

  @Mutation
  private SET_TOKEN(token: string) {
    this.token = token
    setToken(token)
  }

  @Mutation
  private SET_USERINFO(data) {
    this.userInfo = data
  }

  @Mutation
  private SET_ROLES(roles: string[]) {
    this.roles = roles
  }
  
  @Action
  public async Login(userInfo: { phone: string, password: string }) {
    const { phone, password } = userInfo
    return UsersService.login({ phone: phone.trim(), password })
      .then(res => {
        this.SET_TOKEN(res)
        // this.GetUserInfo()
      }).catch(ex => ex)
  }

  @Action
  public ResetToken() {
    removeToken()
    this.SET_TOKEN('')
    this.SET_ROLES([])
  }

  @Action
  public GetUserInfo() {
    const token = getToken()
    this.SET_TOKEN(token)
    const userInfo = JSON.parse(decodeURIComponent(escape(window.atob(token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')))))
    this.SET_USERINFO(userInfo)
    // debugger
    this.SET_ROLES([userInfo.role, String(userInfo.roleCode), USER_ROLES[userInfo.roleCode]])

    console.log(userInfo)
  }

  @Action
  public async ChangeRoles(role: string) {
    // Dynamically modify permissions
    const token = role + '-token'
    this.SET_TOKEN(token)
    setToken(token)
    // await this.getUserInfo()
    resetRouter()
    // Generate dynamic accessible routes based on roles
    PermissionModule.GenerateRoutes(this.roles)
    // Add generated routes
    PermissionModule.dynamicRoutes.forEach(route => {
      router.addRoute(route)
    })
  }

  @Action
  public async LogOut() {
    if (this.token === '') {
      throw Error('LogOut: token is undefined!')
    }
    await this.GetUserInfo()
    removeToken()
    resetRouter()

    this.SET_TOKEN('')
    this.SET_ROLES([])
    return Promise.resolve()
  }
}

export const UserModule = getModule(User)
