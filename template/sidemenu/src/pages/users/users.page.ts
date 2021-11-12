import { ModalUser } from '@/modals';
import { UsersService } from '@/services/users';
import { UserModule } from '@/store/modules/user.store';
import { USER_ROLES } from '@/class/constant';
import { Toast } from '@/utils/toast';
import { MessageBox } from 'element-ui';
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'users-page',
  components: {}
})

export default class extends Vue {

  loading = true
  states = { 1: '启用', 0: '停用' };
  roles = USER_ROLES;
  query = { role: '', state: '', enterpriseId: <string>this.$route.query.enterpriseId || '', pageSize: 10, pageIndex: 1, keyword: '' }
  items: any = [];
  total = 0;
  role = UserModule.userInfo.roleCode
  mounted() {
    this.patch()
  }

  patch(reset?) {
    const loading = this.$loading({ target: (<any>this.$refs.table).$el })
    if (reset) this.query.pageIndex = 1
    UsersService.items(this.query)
      .then(res => {
        this.items = res.data
        this.total = res.recordCount
      }).catch(ex => ex).finally(() => loading.close())
  }

  async modify(item?) {
    const modal = this.$modal.create(ModalUser, { data: item })
    modal.present()
    const res = await modal.onDismissed()
    res.data && this.patch(1)
  }

  async stateToggle(item: any) {
    if (item.enable) {
      const action = await MessageBox.confirm(`确认停用${item.roleName}账号【${item.name}】吗？`, '设置用户状态', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        showClose: false
      }).catch(ex => null)
      if (action !== 'confirm') return
    }

    UsersService.setState(item.id, !item.enable).then(() => {
      let obj = {
        f: 'error',
        msg: `停用`
      }
      if (!item.enable) {
        obj = {
          f: 'success',
          msg: `启用`
        }
      }
      Toast[item.enable ? 'error' : 'success'](`【${item.name}】已经${obj.msg}`, `保存成功`)
      this.$set(item, 'enable', Number(!item.enable))
    }).catch(ex => ex)

  }

  async resetPassword(item) {
    const action = await MessageBox.confirm(`确认重置【${item.name}】密码吗，重置后密码为手机尾号后6位。`, '密码重置', {
      confirmButtonText: '确 定',
      cancelButtonText: '取 消',
      showClose: false
    })
    if (action !== 'confirm') return;
    UsersService.resetPassword(item.id).then(() => Toast.success('密码重置成功'))
  }
}