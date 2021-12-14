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
    :create-status="createStatus"
    @init="init"
    @delete="remove"
    @post="post"
    @put="put"
  ></base-table>
</template>

<script>
import BaseTable from '@/components/base-table/BaseTable.vue'
import {
  getUsers, deleteUsers, putUsers, postUsers,
} from '@/api/users'

export default {
  components: {
    BaseTable,
  },
  data: () => ({
    search: '',
    createStatus: true,
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: '头像',
        align: 'start',
        value: 'avatar',
        sortable: true,
        editType: 'avatar',
        hidden: true,
      },
      {
        text: '昵称',
        align: 'start',
        value: 'nickname',
        sortable: true,
        rules: [v => (v != null && v.length > 0) || '请输入内容~'],
      },
      {
        text: '用户名',
        align: 'start',
        value: 'userName',
        sortable: true,
        hidden: true,
      },
      {
        text: '电话',
        align: 'start',
        value: 'mobile',
        sortable: true,
      },
      {
        text: '描述',
        align: 'start',
        value: 'description',
        sortable: true,
        editType: 'textarea',
        rules: [v => (v != null && v.length > 0) || '请输入内容~'],
      },
      {
        text: '登录次数',
        align: 'start',
        value: 'loginCount',
        sortable: true,
        hidden: true,
      },
      {
        text: '最后登录时间',
        align: 'start',
        value: 'lastLoginTime',
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
        text: '创建人',
        align: 'start',
        value: 'createdUserName',
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
        text: '更新人',
        align: 'start',
        value: 'updatedUserName',
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
    editedItem: {
      roleName: '',
      description: '',
      isDeleted: 0,
    },
    defaultItem: {
      roleName: '',
      description: '',
      isDeleted: 0,
    },
    page: 1,
    pageCount: 1,
    itemsPerPage: 15,
    title: '用户管理',
    titleDes: '用户管理页面用于配置用户信息。',
  }),
  methods: {
    async init() {
      const { response } = await getUsers()

      return response
    },
    async remove(id) {
      await deleteUsers(id)
    },
    async put(editedItem) {
      const { response } = await putUsers(editedItem)

      return response
    },
    async post(editedItem) {
      const { response } = await postUsers(editedItem)

      return response
    },
  },
  setup() {
    return {}
  },
}
</script>
