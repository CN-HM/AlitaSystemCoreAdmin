import { tarkovService } from '@/utils/request'

export const getTarkovChestrigs = () =>
  tarkovService({
    url: 'api/TarkovChestrigs',
    method: 'get',
  })

export const postTarkovChestrig = data =>
  tarkovService({
    url: 'api/TarkovChestrigs',
    method: 'post',
    data,
  })

export const putTarkovChestrig = data =>
  tarkovService({
    url: 'api/TarkovChestrigs',
    method: 'put',
    data,
  })

export const deleteTarkovChestrig = data =>
  tarkovService({
    url: 'api/TarkovChestrigs',
    method: 'delete',
    data,
  })
