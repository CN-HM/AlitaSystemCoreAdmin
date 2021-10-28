import axios from 'axios'
import store from '@/store'
import { getToken } from '@/utils/auth'

const errorFun = error => {
  // do something with request error
  console.log(error) // for debug
  this.$store.dispatch('message/error', error.message)

  return Promise.reject(error)
}

const requestConfig = reConfig => {
  const config = reConfig

  // do something before request is sent
  if (store.getters.token) {
    // let each request carry token
    // ['X-Token'] is a custom headers key
    // please modify it according to the actual situation
    config.headers.Authorization = `Bearer ${getToken()}`
  }

  return config
}

const responseHandle = response => {
  const res = response.data

  // if the custom status is not 20000, it is judged as an error.
  if (response.status !== 200) {
    switch (response.status) {
      case 400:
        store.dispatch('message/error', `${res}~`)
        break
      case 401:
        store.dispatch('message/error', '无权限访问该页面~')
        break
      case 403:
        store.dispatch('message/error', '未授权~')
        break
      case 404:
        store.dispatch('message/error', '接口不存在~')
        break
      case 500:
        store.dispatch('message/error', '接口罢工啦，请联系开发人员~')
        break
      default:
        store.dispatch('message/error', '未知错误，请联系开发人员~')
        break
    }

    return Promise.reject(new Error(res || 'Error'))
  }

  return res
}

const validateStatusHandle = status => status >= 200 && status < 504 // 设置默认的合法的状态

const timeoutNum = 10000

// create an axios instance 创建axios实例
const adminService = axios.create({
  validateStatus(status) {
    return validateStatusHandle(status)
  },
  baseURL: process.env.VUE_APP_ADMIN_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: timeoutNum, // request timeout
})

const miniAppService = axios.create({
  validateStatus(status) {
    return validateStatusHandle(status)
  },
  baseURL: process.env.VUE_APP_MINIAPP_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: timeoutNum, // request timeout
})

const wcService = axios.create({
  validateStatus(status) {
    return validateStatusHandle(status)
  },
  baseURL: process.env.VUE_APP_WC_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: timeoutNum, // request timeout
})

// request interceptor 后台接口
adminService.interceptors.request.use(
  config => requestConfig(config),
  error => errorFun(error),
)

// response interceptor 后台接口拦截器
adminService.interceptors.response.use(

  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom status
   * Here is just an example
   * You can also judge the status by HTTP Status status
   */
  response => responseHandle(response),
  error => errorFun(error),
)

// request interceptor 小程序接口
miniAppService.interceptors.request.use(
  config => requestConfig(config),
  error => errorFun(error),
)

// response interceptor 小程序接口拦截器
miniAppService.interceptors.response.use(

  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom status
   * Here is just an example
   * You can also judge the status by HTTP Status status
   */
  response => responseHandle(response),
  error => errorFun(error),
)

// request interceptor 微信接口
wcService.interceptors.request.use(
  config => requestConfig(config),
  error => errorFun(error),
)

// response interceptor 微信接口拦截器
wcService.interceptors.response.use(

  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom status
   * Here is just an example
   * You can also judge the status by HTTP Status status
   */
  response => responseHandle(response),
  error => errorFun(error),
)

export default {
  adminService,
  wcService,
  miniAppService,
}
