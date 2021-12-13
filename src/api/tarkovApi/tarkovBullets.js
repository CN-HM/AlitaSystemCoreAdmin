import { tarkovService } from '@/utils/request'

export const getTarkovBullets = () =>
  tarkovService({
    url: 'api/tarkovBullets',
    method: 'get',
  })

export const postTarkovBullet = data =>
  tarkovService({
    url: 'api/tarkovBullets',
    method: 'post',
    data,
  })

export const putTarkovBullet = data =>
  tarkovService({
    url: 'api/tarkovBullets',
    method: 'put',
    data,
  })

export const deleteTarkovBullet = data =>
  tarkovService({
    url: 'api/tarkovBullets',
    method: 'delete',
    data,
  })
