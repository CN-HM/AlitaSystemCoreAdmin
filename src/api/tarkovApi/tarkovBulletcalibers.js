import { tarkovService } from '@/utils/request'

export const getTarkovBulletcalibers = () =>
  tarkovService({
    url: 'api/tarkovBulletcalibers',
    method: 'get',
  })

export const postTarkovBulletcaliber = data =>
  tarkovService({
    url: 'api/tarkovBulletcalibers',
    method: 'post',
    data,
  })

export const putTarkovBulletcaliber = data =>
  tarkovService({
    url: 'api/tarkovBulletcalibers',
    method: 'put',
    data,
  })

export const deleteTarkovBulletcaliber = data =>
  tarkovService({
    url: 'api/tarkovBulletcalibers',
    method: 'delete',
    data,
  })
