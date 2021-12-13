<template>
  <base-table
    :page="page"
    :page-count="pageCount"
    :items-per-page="itemsPerPage"
    :title-des="titleDes"
    :title="title"
    :default-item="defaultItem"
    :edited-item="editedItem"
    :headers="headers"
    :createStatus="createStatus"
    @init="init"
    @delete="remove"
    @post="post"
    @put="put"
  >
  </base-table>
</template>

<script>
import BaseTable from '@/components/base-table/BaseTable.vue'
import { getWcChatUsers, deleteWcChatUsers, putWcChatUsers, postWcChatUsers } from '@/api/weChatUsers'

export default {
  components: { BaseTable },
  data: () => ({
    search: '',
    createStatus:false,
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: '微信头像',
        align: 'start',
        value: 'weChatFace',
        sortable: true,
        editType: 'avatar',
        hidden: true,
      },
      {
        text: '微信用户名',
        align: 'start',
        value: 'weChatName',
        sortable: true,
        hidden: true,
      },
      {
        text: 'OpenId',
        align: 'start',
        value: 'openId',
        sortable: true,
        hidden: true,
      },
      {
        text: 'UnionID',
        align: 'start',
        value: 'unionID',
        sortable: true,
        hidden: true,
      },
      {
        text: '登录次数',
        align: 'start',
        value: 'loginCount',
        sortable: true,
        hidden: true,
      },
      {
        text: '创建时间',
        align: 'start',
        value: 'createdTime',
        sortable: true,
        hidden: true,
      },
      {
        text: '更新时间',
        align: 'start',
        value: 'updatedTime',
        sortable: true,
        hidden: true,
      },
      {
        text: '是否禁用',
        align: 'start',
        value: 'isDeleted',
        sortable: true,
        editType: 'switch',
      },
      {
        text: '操作',
        value: 'actions',
        sortable: false,
        hidden: true,
        editType: 'actions',
      },
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: { isDeleted: 0 },
    defaultItem: { isDeleted: 0 },
    page: 1,
    pageCount: 1,
    itemsPerPage: 15,
    title: '微信用户管理',
    titleDes: '微信用户管理页面用于配置微信用户信息,可禁用用户。',
  }),
  methods: {
    async init() {
      const { response } = await getWcChatUsers()

      return response
    },
    async remove(id) {
      await deleteWcChatUsers(id)
    },
    async put(editedItem) {
      const { response } = await putWcChatUsers(editedItem)

      return response
    },
    async post(editedItem) {
      const { response } = await postWcChatUsers(editedItem)

      return response
    },
  },
  setup() {
    return {}
  },
}
</script>
