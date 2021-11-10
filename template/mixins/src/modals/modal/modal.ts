import modalComponent from './modal.vue'
export const Modal = {
  install: (Vue:any) => {
    const ModalCom = Vue.extend(modalComponent) // 创建的是一个组件构造器，不是实例
    const instance = new ModalCom().$mount()
    document.body.appendChild(instance.$el) // 添加dom元素
    Vue.prototype.$modal = instance
  }
}
