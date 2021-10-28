import request from '@/utils/request'

// TODO NET5后端支持GETINFO 使用SysUser Get即可
export const login = data => request.adminService({
  url: 'api/Login',
  method: 'post',
  data,
})

export const getAllUsers = () => request.adminService({
  url: 'api/Users',
  method: 'get',
})

export const getUserInfo = () => request.adminService({
  url: 'api/UserInfos',
  method: 'get',
})

export const updateUser = data => request.adminService({
  url: 'api/Users',
  method: 'get',
  data,
})
