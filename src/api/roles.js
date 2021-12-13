import { adminService } from '@/utils/request'

export const getRoles = () =>
  adminService.request({
    url: 'api/Roles',
    method: 'get',
  })

export const postRoles = data =>
  adminService({
    url: 'api/Roles',
    method: 'post',
    data,
  })

export const putRoles = data =>
  adminService({
    url: 'api/Roles',
    method: 'put',
    data,
  })

export const deleteRoles = data =>
  adminService({
    url: 'api/Roles',
    method: 'delete',
    data,
  })
