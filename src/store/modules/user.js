import { login, getUserInfo } from '@/api/users'
import {
  removeToken, setToken, getToken, setRefreshToken, getRefreshToken,
} from '@/utils/auth'
import router, { resetRouter } from '@/router'

const state = {
  token: getToken(),
  refreshToken: getRefreshToken(),
  name: '',
  avatar: '',
  introduction: '',
  roles: [],
  userId: null,
}

const mutations = {
  SET_USERID: (rqState, id) => {
    const res = rqState
    res.userId = id
  },
  SET_TOKEN: (rqState, localStorage) => {
    const res = rqState
    res.token = localStorage
  },
  SET_REFRESHTOKEN: (rqState, localStorage) => {
    const res = rqState
    res.refreshToken = localStorage
  },
  SET_INTRODUCTION: (rqState, introduction) => {
    const res = rqState
    res.introduction = introduction
  },
  SET_NAME: (rqState, name) => {
    const res = rqState
    res.name = name
  },
  SET_AVATAR: (rqState, avatar) => {
    const res = rqState
    res.avatar = avatar
  },
  SET_PERMISSIONS: (rqState, roles) => {
    const res = rqState
    res.roles = roles
  },
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo

    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password }).then(res => {
        const { token, refreshToken } = res.response

        // 设置基本token
        commit('SET_TOKEN', token)
        setToken(token)

        // 设置刷新token
        commit('SET_REFRESHTOKEN', refreshToken)
        setRefreshToken(refreshToken)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit }) {
    commit('SET_TOKEN', '')
    commit('SET_REFRESHTOKEN', '')
    commit('SET_PERMISSIONS', [])
    removeToken()
    resetRouter()
  },

  // get user info
  getUserInfo({ commit }) {
    return new Promise((resolve, reject) => {
      getUserInfo().then(res => {
        if (!res) {
          reject(new Error('Verification failed, please Login again.'))
        }

        const {
          permissions,
          avatar,
          nickname,
          mobile,
          id,
        } = res.response

        // roles must be a non-empty array
        if (!permissions || permissions.length <= 0) {
          reject(new Error('getUserInfo: roles must be a non-null array!'))
        }

        commit('SET_USERID', id)
        commit('SET_PERMISSIONS', permissions)
        commit('SET_NAME', nickname)
        commit('SET_AVATAR', avatar)
        commit('SET_INTRODUCTION', mobile)

        resolve(res.response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_REFRESHTOKEN', '')
      commit('SET_PERMISSIONS', [])
      removeToken()
      resolve()
    })
  },

  // dynamically modify permissions 动态修改权限
  async changeRoles({ commit, dispatch }, role) {
    const localStorage = `${role}-localStorage`

    commit('SET_TOKEN', localStorage)
    setToken(localStorage)

    const { roles } = await dispatch('getUserInfo')

    resetRouter()

    // generate accessible routes map based on roles 根据角色生成可访问的路线图
    const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })

    // dynamically add accessible routes 动态添加可访问的路由
    router.addRoutes(accessRoutes)

    // reset visited views and cached views 重置访问视图和缓存视图
    dispatch('tagsView/delAllViews', null, { root: true })
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
