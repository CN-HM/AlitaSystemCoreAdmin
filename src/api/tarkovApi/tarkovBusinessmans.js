import { tarkovService } from '@/utils/request'

export const getTarkovBusinessmans = () =>
  tarkovService({
    url: 'api/TarkovBusinessmans',
    method: 'get',
  })

export const postTarkovBusinessman = data =>
  tarkovService({
    url: 'api/TarkovBusinessmans',
    method: 'post',
    data,
  })

export const putTarkovBusinessman = data =>
  tarkovService({
    url: 'api/TarkovBusinessmans',
    method: 'put',
    data,
  })

export const deleteTarkovBusinessman = data =>
  tarkovService({
    url: 'api/TarkovBusinessmans',
    method: 'delete',
    data,
  })
