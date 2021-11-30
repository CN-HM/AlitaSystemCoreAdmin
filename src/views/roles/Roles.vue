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
  ></base-table>
</template>

<script>
import BaseTable from '@/components/base-table/BaseTable.vue'
import {
  getRoles, deleteRoles, putRoles, postRoles,
} from '@/api/roles'

export default {
  components: {
    BaseTable,
  },
  data: () => ({
    search: '',
    createStatus:true,
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: '角色名称', align: 'start', value: 'roleName', sortable: true, rules: [v => v.length > 0 || '请输入内容~'],
      },
      {
        text: '描述', align: 'start', value: 'description', sortable: true, editType: 'textarea', rules: [v => v.length > 0 || '请输入内容~'],
      },
      {
        text: '创建时间', align: 'start', value: 'createdTime', sortable: true, hidden: true,
      },
      {
        text: '创建人', align: 'start', value: 'createdUserName', sortable: true, hidden: true,
      },
      {
        text: '更新时间', align: 'start', value: 'updatedTime', sortable: true, hidden: true,
      },
      {
        text: '更新人', align: 'start', value: 'updatedUserName', sortable: true, hidden: true,
      },
      {
        text: '是否禁用', align: 'start', value: 'isDeleted', sortable: true, editType: 'switch',
      },
      {
        text: '操作', value: 'actions', sortable: false, hidden: true,
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
    title: '角色管理',
    titleDes: '角色管理页面用于配置角色信息。',
  }),
  methods: {
    async init() {
      const { response } = await getRoles()

      return response
    },
    async remove(id) {
      await deleteRoles(id)
    },
    async put(editedItem) {
      const { response } = await putRoles(editedItem)

      return response
    },
    async post(editedItem) {
      const { response } = await postRoles(editedItem)

      return response
    },
  },
  setup() {
    return {}
  },
}
</script>
