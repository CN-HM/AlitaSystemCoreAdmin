import { tarkovService } from '@/utils/request'

export const getTarkovSkilltypes = () =>
  tarkovService({
    url: 'api/TarkovSkilltypes',
    method: 'get',
  })

export const postTarkovSkilltype = data =>
  tarkovService({
    url: 'api/TarkovSkilltypes',
    method: 'post',
    data,
  })

export const putTarkovSkilltype = data =>
  tarkovService({
    url: 'api/TarkovSkilltypes',
    method: 'put',
    data,
  })

export const deleteTarkovSkilltype = data =>
  tarkovService({
    url: 'api/TarkovSkilltypes',
    method: 'delete',
    data,
  })
