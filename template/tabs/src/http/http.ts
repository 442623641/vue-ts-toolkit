import axios from 'axios'
import { UserModule } from '@/store/modules/user.store'
import { Toast } from '@/utils/toast'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  timeout: 5000
  // withCredentials: true // send cookies when cross-domain requests
})

const exNull = (obj?: any) => {
  if (!obj) return {}
  const nobj = {}
  const keys = Object.keys(obj)
  keys.forEach(key => {
    let val = typeof (obj[key]) == 'string' ? obj[key].trim() : obj[key];
    if ([undefined, null, ''].indexOf(val) == -1 && !key.startsWith('_')) {
      nobj[key] = obj[key]
    }
  })
  return nobj
}

// Request interceptors
service.interceptors.request.use(
  (config) => {
    config.headers['Content-Type'] = 'application/json;charset=UTF-8'
    // Add Authorization header to every request, you can add other custom headers here
    if (UserModule.token) {
      config.headers.Authorization = 'Bearer ' + UserModule.token
    }
    if (config.data) {
      config.data = exNull(config.data)
    }
    if (config.params) {
      config.params = exNull(config.params)
    }
    return config
  },
  (error) => {
    Promise.reject(error)
  }
)
// Response interceptors
service.interceptors.response.use(
  (response) => response.data,
  (error) => {
    Toast.error(error?.response?.data?.message || error.message, '请求异常')
    if (error?.response?.status == 401) {
      UserModule.ResetToken()
      location.reload()
    }
    console.error(error)
    return Promise.reject(error)
  }
)

export default service
