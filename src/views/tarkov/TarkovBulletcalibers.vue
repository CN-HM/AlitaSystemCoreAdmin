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
import { getTarkovBulletcalibers , deleteTarkovBulletcaliber, putTarkovBulletcaliber, postTarkovBulletcaliber } from '@/api/tarkovApi/tarkovBulletcalibers'

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
        text: '子弹口径名称',
        align: 'start',
        value: 'bulletCaliber',
        sortable: true,
        rules: [v => (v != null && v.length > 0) || '请输入内容~'],
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
    title: '子弹口径管理',
    titleDes: '',
  }),
  methods: {
    async init() {
      const { response } = await getTarkovBulletcalibers()
      return response
    },
    async remove(id) {
      await deleteTarkovBulletcaliber(id)
    },
    async put(editedItem) {
      const { response } = await putTarkovBulletcaliber(editedItem)
      return response
    },
    async post(editedItem) {
      const { response } = await postTarkovBulletcaliber(editedItem)
      return response
    },
  },
  setup() {
    return {}
  },
}
</script>
