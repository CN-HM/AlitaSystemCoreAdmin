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
  getTarkovChestrigs,
  deleteTarkovChestrig,
  putTarkovChestrig,
  postTarkovChestrig,
} from '@/api/tarkovApi/tarkovChestrigs'

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
// cellsImageUrl: "https://alitasystem.net/chestrigslayout/Alpha_Rig_Slots.png"
// cellsNum: 20
// chestrigsImageUrl: "https://alitasystem.net/chestrigs/Alpha_Rig_icon.png"
// class: 0
// createdTime: null
// durable: null
// ergonomics: null
// id: 57
// isDeleted: 0
// movingSpeed: null
// name: "ANA Tactical Alpha胸挂"
// protectedLocation: null
// turningSpeed: null
// updatedTime: "2021-01-07 13:25:44"
      {
        text: '图片',
        align: 'start',
        value: 'chestrigsImageUrl',
        sortable: false,
        editType: 'image',
        hidden: true,
      },
      {
        text: '空间布局',
        align: 'start',
        value: 'cellsImageUrl',
        sortable: false,
        editType: 'image',
        hidden: true,
      },
      {
        text: '名称',
        align: 'start',
        value: 'name',
        width: 140,
        sortable: false,
        rules: [v => (v != null && v.length > 0) || '请输入内容~'],
      },
      {
        text: '护甲等级',
        align: 'end',
        value: 'class',
        sortable: true,
        rules: [v => (v != null && v.length > 0) || '请输入内容~'],
      },      
      {
        text: '耐用性',
        align: 'end',
        value: 'class',
        sortable: false,
        rules: [v => (v != null && v.length > 0) || '请输入内容~'],
      },
      {
        text: '有效耐久度',
        align: 'end',
        value: 'durable',
        sortable: false,
        rules: [v => (v != null && v.length > 0) || '请输入内容~'],
      },
      {
        text: '移动速度',
        align: 'end',
        value: 'movingSpeed',
        sortable: false,
        rules: [v => (v != null && v.length > 0) || '请输入内容~'],
      },
      {
        text: '转身速度',
        align: 'end',
        value: 'turningSpeed',
        sortable: false,
        rules: [v => (v != null && v.length > 0) || '请输入内容~'],
      },
      {
        text: '人体工学',
        align: 'end',
        value: 'ergonomics',
        sortable: false,
        rules: [v => (v != null && v.length > 0) || '请输入内容~'],
      },
      {
        text: '防护部位',
        align: 'start',
        value: 'protectedLocation',
        sortable: false,
        rules: [v => (v != null && v.length > 0) || '请输入内容~'],
      },
      {
        text: '创建时间',
        align: 'start',
        value: 'createdTime',
        width: 130,
        sortable: true,
        hidden: true,
      },
      {
        text: '更新时间',
        align: 'start',
        value: 'updatedTime',
        width: 130,
        sortable: true,
        hidden: true,
      },
      {
        text: '是否禁用',
        align: 'start',
        value: 'isDeleted',        
        width:50,
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
    title: '胸挂管理',
    titleDes: '',
  }),
  methods: {
    async init() {
      const { response } = await getTarkovChestrigs()
      return response
    },
    async remove(id) {
      await deleteTarkovChestrig(id)
    },
    async put(editedItem) {
      const { response } = await putTarkovChestrig(editedItem)
      return response
    },
    async post(editedItem) {
      const { response } = await postTarkovChestrig(editedItem)
      return response
    },
  },
  setup() {
    return {}
  },
}
</script>
