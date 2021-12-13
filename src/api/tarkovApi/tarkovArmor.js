import { tarkovService } from '@/utils/request'

export const getTarkovArmors = () =>
  tarkovService({
    url: 'api/TarkovArmors',
    method: 'get',
  })

export const postTarkovArmor = data =>
  tarkovService({
    url: 'api/TarkovArmors',
    method: 'post',
    data,
  })

export const putTarkovArmor = data =>
  tarkovService({
    url: 'api/TarkovArmors',
    method: 'put',
    data,
  })

export const deleteTarkovArmor = data =>
  tarkovService({
    url: 'api/TarkovArmors',
    method: 'delete',
    data,
  })
