import request from '@/utils/request'

// 获取所有权限
export const getAllPermissions = () => request.adminService({
  url: 'api/Permissions',
  method: 'get',
})

export const postPermissions = data => request.adminService({
  url: 'api/Permissions',
  method: 'post',
  data,
})

export const putPermissions = data => request.adminService({
  url: 'api/Permissions',
  method: 'put',
  data,
})

export const deletePermissions = data => request.adminService({
  url: 'api/Permissions',
  method: 'delete',
  data,
})
