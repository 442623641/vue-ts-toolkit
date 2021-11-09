import { Notification } from 'element-ui'
const alert = (message, title, type) => {
  Notification({ duration: 3000, title, message, customClass: 'flowing-toast ' + type + (title ? '' : ' only-message'), showClose: false, type: type })
}

export const Toast = {
  success: (message, title?) => alert(message, title, 'success'),
  error: (message, title?) => alert(message, title, 'error')
}
