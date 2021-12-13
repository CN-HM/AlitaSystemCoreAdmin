import { tarkovService } from '@/utils/request'

export const getTarkovTaskgoods = () =>
  tarkovService({
    url: 'api/TarkovTaskgoods',
    method: 'get',
  })

export const postTarkovTaskgood = data =>
  tarkovService({
    url: 'api/TarkovTaskgoods',
    method: 'post',
    data,
  })

export const putTarkovTaskgood = data =>
  tarkovService({
    url: 'api/TarkovTaskgoods',
    method: 'put',
    data,
  })

export const deleteTarkovTaskgood = data =>
  tarkovService({
    url: 'api/TarkovTaskgoods',
    method: 'delete',
    data,
  })
