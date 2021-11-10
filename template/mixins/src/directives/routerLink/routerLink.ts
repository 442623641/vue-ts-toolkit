
import { DirectiveOptions } from 'vue'
export const routerLink: DirectiveOptions = {
  bind(el, binding, vnode: any) {
    el['binding'] = binding;
    el.addEventListener('click', (e) => attacEvent(el, vnode, e))
  },
  update(el, binding) {
    el['binding'] = binding
  },
  unbind(el, binding, vnode) {
    el.removeEventListener('click', (e) => attacEvent(el, vnode, e));
  }
}

function attacEvent(el, vnode: any, event) {
  var binding = el['binding']
  binding.modifiers.stop && event.stopPropagation()
  binding.value && vnode.context.$router.push(binding.value)
}
