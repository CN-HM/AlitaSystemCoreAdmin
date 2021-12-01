import { tarkovService } from '@/utils/request'

export const getTkfArmor = () => tarkovService({
  url: 'api/TarkovArmor',
  method: 'get',
})

export const postTkfArmor = data => tarkovService({
  url: 'api/TarkovArmor',
  method: 'post',
  data,
})

export const putTkfArmor = data => tarkovService({
  url: 'api/TarkovArmor',
  method: 'put',
  data,
})

export const deleteTkfArmor = data => tarkovService({
  url: 'api/TarkovArmor',
  method: 'delete',
  data,
})
