import { tarkovService } from '@/utils/request'

export const getTarkovHeadwears = () =>
  tarkovService({
    url: 'api/TarkovHeadwears',
    method: 'get',
  })

export const postTarkovHeadwear = data =>
  tarkovService({
    url: 'api/TarkovHeadwears',
    method: 'post',
    data,
  })

export const putTarkovHeadwear = data =>
  tarkovService({
    url: 'api/TarkovHeadwears',
    method: 'put',
    data,
  })

export const deleteTarkovHeadwear = data =>
  tarkovService({
    url: 'api/TarkovHeadwears',
    method: 'delete',
    data,
  })
