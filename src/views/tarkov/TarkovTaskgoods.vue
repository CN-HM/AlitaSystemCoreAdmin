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
  getTarkovTaskgoods,
  deleteTarkovTaskgood,
  putTarkovTaskgood,
  postTarkovTaskgood,
} from '@/api/tarkovApi/tarkovTaskgoods'

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
      // createdTime: "2021-01-01 01:29:28"
      // demand: "上交物品"
      // description: null
      // goodsImageUrl: "https://alitasystem.net/taskGoodsImage/MR-133_icon_2.png"
      // goodsName: "MP-133 12铅径 霰弹枪"
      // goodsNum: "2"
      // id: 1
      // isDeleted: 0
      // taskId: 1
      // updatedTime: "2021-01-07 20:29:24"
      {
        text: '图片',
        align: 'start',
        value: 'goodsImageUrl',
        width: 50,
        sortable: false,
        editType: 'image',
        hidden: true,
      },
      {
        text: '名称',
        align: 'start',
        value: 'goodsName',
        sortable: false,
        width: 120,
        rules: [v => (v != null && v.length > 0) || '请输入内容~'],
      },
      {
        text: '物品数量',
        align: 'start',
        value: 'goodsNum',
        width: 80,
        sortable: false,
        rules: [v => (v != null && v.length > 0) || '请输入内容~'],
      },
      {
        text: '需求',
        align: 'start',
        value: 'demand',
        width: 190,
        sortable: false,
        rules: [v => (v != null && v.length > 0) || '请输入内容~'],
      },
      {
        text: '描述',
        align: 'start',
        value: 'description',
        width: 280,
        sortable: false,
        rules: [v => (v != null && v.length > 0) || '请输入内容~'],
      },
      {
        text: '创建时间',
        align: 'start',
        value: 'createdTime',
        width: 100,
        sortable: true,
        hidden: true,
      },
      {
        text: '更新时间',
        align: 'start',
        value: 'updatedTime',
        width: 100,
        sortable: true,
        hidden: true,
      },
      {
        text: '是否禁用',
        align: 'start',
        value: 'isDeleted',
        width: 50,
        sortable: true,
        editType: 'switch',
      },
      {
        text: '操作',
        value: 'actions',
        width: 50,
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
    title: '任务物品管理',
    titleDes: '',
  }),
  methods: {
    async init() {
      const { response } = await getTarkovTaskgoods()

      return response
    },
    async remove(id) {
      await deleteTarkovTaskgood(id)
    },
    async put(editedItem) {
      const { response } = await putTarkovTaskgood(editedItem)

      return response
    },
    async post(editedItem) {
      const { response } = await postTarkovTaskgood(editedItem)

      return response
    },
  },
  setup() {
    return {}
  },
}
</script>
