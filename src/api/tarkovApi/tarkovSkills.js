import { tarkovService } from '@/utils/request'

export const getTarkovSkills = () =>
  tarkovService({
    url: 'api/TarkovSkills',
    method: 'get',
  })

export const postTarkovSkill = data =>
  tarkovService({
    url: 'api/TarkovSkills',
    method: 'post',
    data,
  })

export const putTarkovSkill = data =>
  tarkovService({
    url: 'api/TarkovSkills',
    method: 'put',
    data,
  })

export const deleteTarkovSkill = data =>
  tarkovService({
    url: 'api/TarkovSkills',
    method: 'delete',
    data,
  })
