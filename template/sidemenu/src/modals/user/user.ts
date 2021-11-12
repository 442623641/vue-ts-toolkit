// Created by Leo on 2021-01-25
import { IUser } from '@/class/user'
import { Toast } from '@/utils/toast'
import { Component, Prop, Vue } from 'vue-property-decorator'
import { USER_ROLES } from '@/class/constant'
import { UsersService } from '@/services/users'
import { ElForm } from 'element-ui/types/form'
import { UserModule } from '@/store/modules/user.store'
@Component({
  name: 'modal-user',
  components: {}
})
export default class extends Vue {
  @Prop({ default: {} }) data!: IUser;
  roles = {};
  cascader: any = {};
  query: IUser = <IUser>{ id: '', name: '', phone: '', role: '' };
  rules: any = {
    phone: [{ pattern: /^1[3-9](\d{9})$/, message: '请输入正确的手机号', trigger: 'change' },
    { max: 11, message: '请输入11位手机号', required: true, trigger: 'blur' }],
    name: [{ trigger: 'blur', required: true, min: 2, max: 20, message: '请选择有效的用户名称' }],
    role: [{ trigger: 'change', required: true, message: '请选择用户角色' }],
  };
  mounted() {
    //除了超管，都不可以创建超管角色
    this.roles = USER_ROLES;
    if (UserModule.userInfo.roleCode != "8") {
      let roles = {};
      Object.keys(USER_ROLES).forEach(v => {
        if (v != '8') {
          roles[v] = USER_ROLES[v]
        }
      })
      this.roles = roles;
    }
    this.query = { ...this.data, role: String(this.data.role || "") }
  }

  save() {
    (this.$refs.form as ElForm).validate(async (valid: boolean) =>
      valid && UsersService.update(this.query).then(res => {
        Toast.success('保存成功')
        this.$emit('dismiss', this.query)
      }).catch(ex => ex))
  }
}
