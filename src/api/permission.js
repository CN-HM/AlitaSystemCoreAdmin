import request from '@/utils/request'

// 获取所有权限
export const getAllPermissions = () => request.adminService({
  url: 'api/Permissions',
  method: 'get',
})

export const PostPermissions = data => request.adminService({
  url: 'api/Permissions',
  method: 'post',
  data,
})

export const PutPermissions = data => request.adminService({
  url: 'api/Permissions',
  method: 'put',
  data,
})

export const DeletePermissions = data => request.adminService({
  url: 'api/Permissions',
  method: 'delete',
  data,
})
