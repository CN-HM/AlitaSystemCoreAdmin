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
  getAllPermissions, deletePermissions, putPermissions, postPermissions,
} from '@/api/permission'

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
        text: '控制器名称', align: 'start', value: 'controllerName', sortable: true, required: true, rules: [v => v.length > 0 || '请输入内容~'],
      },
      {
        text: '控制器', align: 'start', value: 'controller', sortable: true, required: true, rules: [v => v.length > 0 || '请输入内容~'],
      },
      {
        text: 'Action名称', align: 'start', value: 'actionName', sortable: true, required: true, rules: [v => v.length > 0 || '请输入内容~'],
      },
      {
        text: 'Action', align: 'start', value: 'action', sortable: true, required: true, rules: [v => v.length > 0 || '请输入内容~'],
      },
      {
        text: '描述', align: 'start', value: 'description', sortable: true, required: true, rules: [v => v.length > 0 || '请输入内容~'],
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
      description: '',
      action: '',
      actionName: '',
      controller: '',
      controllerName: '',
      isDeleted: 0,
    },
    defaultItem: {
      description: '',
      action: '',
      actionName: '',
      controller: '',
      controllerName: '',
      isDeleted: 0,
    },
    page: 1,
    pageCount: 1,
    itemsPerPage: 15,
    title: '权限管理',
    titleDes: '权限管理页面用于配置权限的开启、关闭、编辑，权限不可删除。',
  }),
  methods: {
    async init() {
      const { response } = await getAllPermissions()

      return response
    },
    async remove(id) {
      await deletePermissions(id)
    },
    async put(editedItem) {
      const { response } = await putPermissions(editedItem)

      return response
    },
    async post(editedItem) {
      const { response } = await postPermissions(editedItem)

      return response
    },
  },
  setup() {
    return {}
  },
}
</script>
