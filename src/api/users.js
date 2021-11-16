import request from '@/utils/request'

// TODO NET5后端支持GETINFO 使用SysUser Get即可
export const login = data => request.adminService({
  url: 'api/Login',
  method: 'post',
  data,
})

export const getUserInfo = () => request.adminService({
  url: 'api/UserInfos',
  method: 'get',
})

export const getUsers = () => request.adminService({
  url: 'api/Users',
  method: 'get',
})

export const postUsers = data => request.adminService({
  url: 'api/Users',
  method: 'post',
  data,
})

export const putUsers = data => request.adminService({
  url: 'api/Users',
  method: 'put',
  data,
})

export const deleteUsers = data => request.adminService({
  url: 'api/Users',
  method: 'delete',
  data,
})
