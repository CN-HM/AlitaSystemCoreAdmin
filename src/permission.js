import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import router from './router'
import store from './store'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login', '/auth-redirect'] // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/dashboard' })
      NProgress.done() // hack: https://github.com/PanJiaChen/vue-element-admin/pull/2939
    } else {
      // determine whether the user has obtained his permission roles through getInfo

      const hasRoles = store.getters.roles && store.getters.roles.length > 0

      if (hasRoles) {
        next()
      } else {
        try {
          // get user info 获取用户信息
          const { permissions } = await store.dispatch('user/getUserInfo')

          // generate accessible routes map based on roles 根据角色生成可访问的路线图
          const accessRoutes = await store.dispatch('permission/generateRoutes', permissions)

          // dynamically add accessible routes 动态添加可访问的路由
          accessRoutes.forEach(item => {
            router.addRoute(item)
          })

          // hack method to ensure that addRoute is complete hack方法以确保addRoute是完整的
          // set the replace: true, so the navigation will not leave a history record 设置replace:true，这样导航将不会留下历史记录
          next({ ...to, replace: true })
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          store.dispatch('message/warning', error || 'Has Error')

          setTimeout(() => {
            return next(`/login?redirect=${to.path}`)
          }, 1000)

          NProgress.done()
        }
      }
    }
  } else {
    /* has no token */
    // eslint-disable-next-line no-lonely-if
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
