import request from '@/utils/request'

export const getRoles = () => request.adminService({
  url: 'api/Roles',
  method: 'get',
})

export const postRoles = data => request.adminService({
  url: 'api/Roles',
  method: 'post',
  data,
})

export const putRoles = data => request.adminService({
  url: 'api/Roles',
  method: 'put',
  data,
})

export const deleteRoles = data => request.adminService({
  url: 'api/Roles',
  method: 'delete',
  data,
})
