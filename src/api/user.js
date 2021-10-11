import request from '@/utils/request'

// TODO NET5后端支持GETINFO 使用SysUser Get即可
export const login = data => request({
  url: 'api/Login',
  method: 'post',
  data,
})

export const getInfo = token => request({
  url: '/vue-element-admin/user/info',
  method: 'get',
  params: { token },
})

export const logout = () => request({
  url: '/vue-element-admin/user/logout',
  method: 'post',
})
