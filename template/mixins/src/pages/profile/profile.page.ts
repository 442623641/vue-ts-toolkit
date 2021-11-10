// Created by ZhangLeo on 2021-11-03
import { Component, Vue } from 'vue-property-decorator'
import { UserModule } from "@/store/modules/user.store";
import { Toast } from "@/utils/toast";
import { UsersService } from "@/services/users";
import { ModalPassword } from "@/modals";

@Component({
  name: 'profile-page',
  components: {}
})

export default class extends Vue {
  userInfo = UserModule.userInfo;
  mounted() {
    console.log('Hellow,I\'m page profile');
  }

  open() {
    this.$prompt("", `修改账户名称`, {
      confirmButtonText: "确定修改",
      cancelButtonText: "取消",
      inputPlaceholder: `请输入新名称`,
      inputValidator: (value) => value.trim()?.length >= 6,
      inputErrorMessage: `至少 2 个字符`,
    })
      .then((res: any) => {
        this.userInfo.name = res.value?.trim();
        UsersService.update(this.userInfo).then((res) => {
          Toast.success("修改成功", "修改账户名称");
        });
      })
      .catch((ex) => ex);
  }
  async modify() {
    const modal = this.$modal.create(ModalPassword, { center: true });
    modal.present();
    const { data } = await modal.onDismissed();
    data && UserModule.LogOut();
  }
}