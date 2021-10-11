import axios from 'axios'
import store from '@/store'
import { getToken } from '@/utils/auth'

// create an axios instance 创建axios实例
const service = axios.create({
  validateStatus(status) {
    return status >= 200 && status < 504 // 设置默认的合法的状态
  },
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 10000, // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      this.headers.Authorization = getToken()
    }

    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug

    return Promise.reject(error)
  },
)

// response interceptor 拦截器
service.interceptors.response.use(

  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom status
   * Here is just an example
   * You can also judge the status by HTTP Status status
   */
  response => {
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
      console.log(1)

      return Promise.reject(new Error(res || 'Error'))
    }

    return res
  },
  error => {
    console.log(`err${error}`) // for debug
    this.$store.dispatch('message/error', error.message)

    return Promise.reject(error)
  },
)

export default service
