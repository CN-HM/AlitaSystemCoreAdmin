import { tarkovService } from '@/utils/request'

export const getTarkovGoods = () =>
  tarkovService({
    url: 'api/TarkovGoods',
    method: 'get',
  })

export const postTarkovGood = data =>
  tarkovService({
    url: 'api/TarkovGoods',
    method: 'post',
    data,
  })

export const putTarkovGood = data =>
  tarkovService({
    url: 'api/TarkovGoods',
    method: 'put',
    data,
  })

export const deleteTarkovGood = data =>
  tarkovService({
    url: 'api/TarkovGoods',
    method: 'delete',
    data,
  })
