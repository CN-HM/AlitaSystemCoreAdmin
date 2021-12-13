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
  getTarkovHeadwears,
  deleteTarkovHeadwear,
  putTarkovHeadwear,
  postTarkovHeadwear,
} from '@/api/tarkovApi/tarkovHeadwears'

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
// armorClass: 1
// armorSegments: "顶部、颈部"
// blocksHeadset: "否"
// createdTime: "2021-01-20 00:10:03"
// durability: "40"
// ergonomics: "-1"
// headwearImageUrl: "https://alitasystem.net/headwear/TK_FAST_Icon.png"
// headwearName: "Tac-Kek Fast MT Helmet (non-ballistic replica)"
// id: 28
// isDeleted: 0
// movementSpeed: "+0%"
// ricochetChance: "高"
// soundReduction: "None"
// turnSpeed: "+0%"
// updatedTime: "2021-01-20 00:10:03"
      {
        text: '图片',
        align: 'start',
        value: 'headwearImageUrl',
        sortable: false,
        editType: 'image',
        hidden: true,
      },
      {
        text: '名称',
        align: 'start',
        value: 'headwearName',
        width: 140,
        sortable: false,
        rules: [v => (v != null && v.length > 0) || '请输入内容~'],
      },      
      {
        text: '防护部位',
        align: 'start',
        value: 'armorSegments',
        sortable: false,
        rules: [v => (v != null && v.length > 0) || '请输入内容~'],
      },
      {
        text: '护甲等级',
        align: 'end',
        value: 'armorClass',
        sortable: true,
        rules: [v => (v != null && v.length > 0) || '请输入内容~'],
      },
      {
        text: '耐久值',
        align: 'end',
        value: 'durability',
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
        text: '听觉损失',
        align: 'start',
        value: 'soundReduction',
        sortable: false,
        rules: [v => (v != null && v.length > 0) || '请输入内容~'],
      },
      {
        text: '人体工学',
        align: 'start',
        value: 'ergonomics',
        sortable: false,
        rules: [v => (v != null && v.length > 0) || '请输入内容~'],
      },
       {
        text: '跳弹率',
        align: 'start',
        value: 'ricochetChance',
        sortable: false,
        rules: [v => (v != null && v.length > 0) || '请输入内容~'],
      },
      {
        text: '耳机影响',
        align: 'start',
        value: 'blocksHeadset',
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
    title: '头盔管理',
    titleDes: '',
  }),
  methods: {
    async init() {
      const { response } = await getTarkovHeadwears()
      return response
    },
    async remove(id) {
      await deleteTarkovHeadwear(id)
    },
    async put(editedItem) {
      const { response } = await putTarkovHeadwear(editedItem)
      return response
    },
    async post(editedItem) {
      const { response } = await postTarkovHeadwear(editedItem)
      return response
    },
  },
  setup() {
    return {}
  },
}
</script>
