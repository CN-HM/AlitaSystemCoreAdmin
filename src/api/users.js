import { adminService } from '@/utils/request'

// TODO NET5后端支持GETINFO 使用SysUser Get即可
export const login = data =>
  adminService({
    url: 'api/Login',
    method: 'post',
    data,
  })

export const getUserInfo = () =>
  adminService({
    url: 'api/UserInfos',
    method: 'get',
  })

export const getUsers = () =>
  adminService({
    url: 'api/Users',
    method: 'get',
  })

export const postUsers = data =>
  adminService({
    url: 'api/Users',
    method: 'post',
    data,
  })

export const putUsers = data =>
  adminService({
    url: 'api/Users',
    method: 'put',
    data,
  })

export const deleteUsers = data =>
  adminService({
    url: 'api/Users',
    method: 'delete',
    data,
  })
