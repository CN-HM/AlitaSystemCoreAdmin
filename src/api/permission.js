import { adminService } from '@/utils/request'

// 获取所有权限
export const getAllPermissions = () => adminService({
  url: 'api/Permissions',
  method: 'get',
})

export const postPermissions = data => adminService({
  url: 'api/Permissions',
  method: 'post',
  data,
})

export const putPermissions = data => adminService({
  url: 'api/Permissions',
  method: 'put',
  data,
})

export const deletePermissions = data => adminService({
  url: 'api/Permissions',
  method: 'delete',
  data,
})
