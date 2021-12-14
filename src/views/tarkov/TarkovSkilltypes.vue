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
  getTarkovSkilltypes,
  deleteTarkovSkilltype,
  putTarkovSkilltype,
  postTarkovSkilltype,
} from '@/api/tarkovApi/tarkovSkilltypes'

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
        text: '名称',
        align: 'start',
        value: 'skillTypeName',
        sortable: false,
        rules: [v => (v != null && v.length > 0) || '请输入内容~'],
      },
      {
        text: '描述',
        align: 'start',
        value: 'description',
        sortable: false,
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
    title: '技能类型管理',
    titleDes: '',
  }),
  methods: {
    async init() {
      const { response } = await getTarkovSkilltypes()

      return response
    },
    async remove(id) {
      await deleteTarkovSkilltype(id)
    },
    async put(editedItem) {
      const { response } = await putTarkovSkilltype(editedItem)

      return response
    },
    async post(editedItem) {
      const { response } = await postTarkovSkilltype(editedItem)

      return response
    },
  },
  setup() {
    return {}
  },
}
</script>
