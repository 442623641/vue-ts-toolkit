import { DirectiveOptions } from 'vue'
import { UserModule } from '@/store/modules/user.store'

export const permission: DirectiveOptions = {
  inserted(el, binding) {
    let { value } = binding;
    const roles = UserModule.roles.map(v => String(v));
    if ((roles.includes('admin')) && !binding.modifiers.strict) return;
    if (!value || !value.length) {
      value = ['admin'];
    }
    // if (value && value instanceof Array && value.length > 0) {
    const permissionRoles = value.map(v => String(v));
    const hasPermission = roles.some((role: any) => permissionRoles.includes(role))
    if (binding.modifiers.except && hasPermission || !binding.modifiers.except && !hasPermission) {
      el.style.display = 'none'
      // setTimeout(() => el.parentNode && el.parentNode.removeChild(el), 60);
    }
    // } else {
    //   throw new Error('need roles! Like v-permission.except="[\'admin\',\'editor\']"')
    // }
  }
}