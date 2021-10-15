import request from '@/utils/request'

// 获取所有权限
export const getAllPermissions = () => request.adminService({
  url: 'api/Permission/get',
  method: 'get',
})

export const Permissions = () => request.adminService({
  url: 'api/Permission/update',
  method: 'get',
})

export const getAllermissions = () => request.adminService({
  url: 'api/Permission/get',
  method: 'get',
})
