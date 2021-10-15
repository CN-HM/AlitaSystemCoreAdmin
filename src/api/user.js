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

export const getUser = id => request.adminService({
  url: 'api/Users',
  method: 'get',
  params: { id },
})

export const updateUser = data => request.adminService({
  url: 'api/Users',
  method: 'get',
  data,
})
