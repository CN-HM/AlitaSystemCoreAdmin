import { adminService } from '@/utils/request'

// 获取角色权限
export const getRolePermissions = roleId =>
  adminService({
    url: 'api/RolePermissions',
    method: 'get',
    params: { roleId },
  })

export const putRolePermissions = data =>
  adminService({
    url: 'api/RolePermissions',
    method: 'put',
    data,
  })
