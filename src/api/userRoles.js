import { adminService } from '@/utils/request'

export const getUserRoles = () =>
  adminService({
    url: 'api/UserRoles',
    method: 'get',
  })

export const postUserRoles = data =>
  adminService({
    url: 'api/UserRoles',
    method: 'post',
    data,
  })

export const putUserRoles = data =>
  adminService({
    url: 'api/UserRoles',
    method: 'put',
    data,
  })

export const deleteUserRoles = data =>
  adminService({
    url: 'api/UserRoles',
    method: 'delete',
    data,
  })
