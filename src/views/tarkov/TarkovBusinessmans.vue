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
  getTarkovBusinessmans,
  deleteTarkovBusinessman,
  putTarkovBusinessman,
  postTarkovBusinessman,
} from '@/api/tarkovApi/tarkovBusinessmans'

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
      // businessManImageUrl: "/root/web/wwwroot/businessman/Prapor_Portrait.png"
      // createdTime: null
      // currencyUsed: "卢布 (₽)"
      // description: "负责看管补给仓库的准尉，该仓库隶属于封锁诺文斯克地区的内卫部队。在“契约战争”期间秘密地为BEAR雇佣兵提供武器、弹药以及他拥有的其它资源。"
      // id: 1
      // isDeleted: 0
      // location: "城镇"
      // name: "帕维尔·叶格罗维奇·罗曼年科"
      // nickname: "Prapor"
      // occupation: null
      // origin: "俄联邦"
      // tarkovTasks: []
      // updatedTime: "2020-12-25 21:24:17"
      // wares: "后苏联集团武器，弹药，手榴弹，弹匣，武器改装。"
      {
        text: '图片',
        align: 'start',
        value: 'businessManImageUrl',
        sortable: false,
        editType: 'image',
        hidden: true,
      },
      {
        text: '中文名称',
        align: 'start',
        value: 'name',
        width: 140,
        sortable: false,
        rules: [v => (v != null && v.length > 0) || '请输入内容~'],
      },
      {
        text: '昵称',
        align: 'start',
        value: 'nickname',
        sortable: false,
        rules: [v => (v != null && v.length > 0) || '请输入内容~'],
      },
      {
        text: '货币',
        align: 'start',
        value: 'currencyUsed',
        width: 140,
        sortable: false,
        rules: [v => (v != null && v.length > 0) || '请输入内容~'],
      },
      {
        text: '地区',
        align: 'start',
        value: 'location',
        width: 150,
        sortable: false,
        rules: [v => (v != null && v.length > 0) || '请输入内容~'],
      },
      {
        text: '起源',
        align: 'start',
        value: 'origin',
        width: 100,
        sortable: false,
        rules: [v => (v != null && v.length > 0) || '请输入内容~'],
      },
      {
        text: '商品',
        align: 'start',
        value: 'wares',
        width: 200,
        sortable: false,
        rules: [v => (v != null && v.length > 0) || '请输入内容~'],
      },
      {
        text: '描述',
        align: 'start',
        value: 'description',
        width: 310,
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
    title: '商人管理',
    titleDes: '',
  }),
  methods: {
    async init() {
      const { response } = await getTarkovBusinessmans()
      return response
    },
    async remove(id) {
      await deleteTarkovBusinessman(id)
    },
    async put(editedItem) {
      const { response } = await putTarkovBusinessman(editedItem)
      return response
    },
    async post(editedItem) {
      const { response } = await postTarkovBusinessman(editedItem)
      return response
    },
  },
  setup() {
    return {}
  },
}
</script>
