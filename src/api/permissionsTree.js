import { adminService } from '@/utils/request'

// 获取所有权限
const getTreePermissions = () =>
  adminService({
    url: 'api/PermissionsTree',
    method: 'get',
  })

export default getTreePermissions
