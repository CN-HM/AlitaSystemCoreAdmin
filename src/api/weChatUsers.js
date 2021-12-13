import { weChatService } from '@/utils/request'

export const getWcChatUsers = () =>
  weChatService({
    url: 'api/WcChatUsers',
    method: 'get',
  })

export const getWcChatUser = id =>
  weChatService({
    url: 'api​/WcChatUsers​',
    method: 'get',
    params: { id },
  })

export const putWcChatUsers = data =>
  weChatService({
    url: 'api/WcChatUsers​',
    method: 'put',
    data,
  })

export const deleteWcChatUsers = data =>
  weChatService({
    url: 'api/WcChatUsers​',
    method: 'delete',
    data,
  })

export const postWcChatUsers = data =>
  weChatService({
    url: 'api/WcChatUsers​',
    method: 'post',
    data,
  })
