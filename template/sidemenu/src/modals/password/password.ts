import { Toast } from '@/utils/toast'
import { Component, Vue } from 'vue-property-decorator'
import { UsersService } from "@/services/users";
import { ElForm } from 'element-ui/types/form';

@Component({
  name: 'password-page',
  components: {}
})
export default class extends Vue {
  query = { pwd: '', repwd: '' };
  rules: any = {
    pwd: [{ trigger: 'blur', required: true, min: 6, max: 50, message: '密码长度在 6 到 50 个字符' }],
    repwd: [{
      trigger: 'blur', required: true, validator: (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.query.pwd) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      }
    }]
  };
  save() {
    (this.$refs.form as ElForm).validate(async (valid: boolean) => {
      if (valid) {
        UsersService.updatepwd(this.query.pwd).then(res => {
          Toast.success('修改成功')
          this.$emit('dismiss', this.query)
        }).catch(ex => ex)
      }
    })
  }
}
