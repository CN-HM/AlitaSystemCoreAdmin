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
    :editDetailStatus="true"
    @init="init"
    @delete="remove"
    @post="post"
    @put="put"
  ></base-table>
</template>

<script>
import BaseTable from '@/components/base-table/BaseTable.vue'
import { getTarkovSkills, deleteTarkovSkill, putTarkovSkill, postTarkovSkill } from '@/api/tarkovApi/tarkovSkills'

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
      // createdTime: null
      // description: "耐力影响跑步和跳跃时耐力消耗，以及屏息消耗和恢复呼吸的速度"
      // id: 3
      // isDeleted: 0
      // skillEffects: "[\"增加耐力(+150%精英级)\",\"减少跳跃耐力消耗(-50%精英级)\",\"增加屏气时间(+100%精英级)\",\"精英级:+150%耐力\",\"精英级:增加双手耐力\",\"精英级:体力消耗不会导致呼吸暂停\"]"
      // skillHideout: "[\"加热等级2需要该技能的1级\",\"安全等级2需要该技能的2级\"]"
      // skillImageUrl: "https://alitasystem.net/skills/Endurance.png"
      // skillName: "耐力"
      // skillRaise: "[\"冲刺\",\"不超重时走路(即黄色或红色)\",\"瞄准屏息\"]"
      // skillType: null
      // skillTypeId: 1
      // updatedTime: "2021-01-25 20:19:09"
      // skillTypeName
      {
        text: '图片',
        align: 'start',
        value: 'skillImageUrl',
        sortable: false,
        editType: 'image',
        hidden: true,
      },
      {
        text: '名称',
        align: 'start',
        value: 'skillName',
        sortable: false,
        rules: [v => (v != null && v.length > 0) || '请输入内容~'],
      },
      {
        text: '类型',
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
    title: '技能管理',
    titleDes: '',
  }),
  methods: {
    async init() {
      const { response } = await getTarkovSkills()
      return response
    },
    async remove(id) {
      await deleteTarkovSkill(id)
    },
    async put(editedItem) {
      const { response } = await putTarkovSkill(editedItem)
      return response
    },
    async post(editedItem) {
      const { response } = await postTarkovSkill(editedItem)
      return response
    },
  },
  setup() {
    return {}
  },
}
</script>
