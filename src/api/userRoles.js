import request from '@/utils/request'

export const getUserRoles = () => request.adminService({
  url: 'api/UserRoles',
  method: 'get',
})

export const postUserRoles = data => request.adminService({
  url: 'api/UserRoles',
  method: 'post',
  data,
})

export const putUserRoles = data => request.adminService({
  url: 'api/UserRoles',
  method: 'put',
  data,
})

export const deleteUserRoles = data => request.adminService({
  url: 'api/UserRoles',
  method: 'delete',
  data,
})
