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
  getTarkovBullets, deleteTarkovBullet, putTarkovBullet, postTarkovBullet,
} from '@/api/tarkovApi/tarkovBullets'

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
        text: '图片',
        align: 'start',
        value: 'bulletImageUrl',
        sortable: false,
        editType: 'image',
        hidden: true,
      },
      {
        text: '名称',
        align: 'start',
        value: 'bulletName',
        width: 180,
        sortable: true,
        rules: [v => (v != null && v.length > 0) || '请输入内容~'],
      },
      {
        text: '肉伤',
        align: 'start',
        value: 'realHarm',
        width: 60,
        sortable: false,
        rules: [v => (v != null && v.length > 0) || '请输入内容~'],
      },
      {
        text: '甲伤',
        align: 'start',
        value: 'armorDamage',
        width: 60,
        sortable: false,
        rules: [v => (v != null && v.length > 0) || '请输入内容~'],
      },
      {
        text: '穿透力',
        align: 'start',
        value: 'penetrability',
        width: 70,
        sortable: false,
        rules: [v => (v != null && v.length > 0) || '请输入内容~'],
      },
      {
        text: '小出血',
        align: 'start',
        value: 'mildBleeding',
        width: 70,
        sortable: false,
        rules: [v => (v != null && v.length > 0) || '请输入内容~'],
      },
      {
        text: '大出血',
        align: 'start',
        value: 'severeBleeding',
        width: 70,
        sortable: false,
        rules: [v => (v != null && v.length > 0) || '请输入内容~'],
      },
      {
        text: '精准度',
        align: 'start',
        value: 'accuracy',
        width: 70,
        sortable: false,
        rules: [v => (v != null && v.length > 0) || '请输入内容~'],
      },
      {
        text: '后坐力',
        align: 'start',
        value: 'recoilForce',
        width: 70,
        sortable: false,
        rules: [v => (v != null && v.length > 0) || '请输入内容~'],
      },
      {
        text: '1级穿甲',
        align: 'start',
        value: 'piercingAbilityLevel1',
        width: 80,
        sortable: false,
        rules: [v => (v != null && v.length > 0) || '请输入内容~'],
      },
      {
        text: '2级穿甲',
        align: 'start',
        value: 'piercingAbilityLevel2',
        width: 80,
        sortable: false,
        rules: [v => (v != null && v.length > 0) || '请输入内容~'],
      },
      {
        text: '3级穿甲',
        align: 'start',
        value: 'piercingAbilityLevel3',
        width: 80,
        sortable: false,
        rules: [v => (v != null && v.length > 0) || '请输入内容~'],
      },
      {
        text: '4级穿甲',
        align: 'start',
        value: 'piercingAbilityLevel4',
        width: 80,
        sortable: false,
        rules: [v => (v != null && v.length > 0) || '请输入内容~'],
      },
      {
        text: '5级穿甲',
        align: 'start',
        value: 'piercingAbilityLevel5',
        width: 80,
        sortable: false,
        rules: [v => (v != null && v.length > 0) || '请输入内容~'],
      },
      {
        text: '6级穿甲',
        align: 'start',
        value: 'piercingAbilityLevel6',
        width: 80,
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
    title: '子弹管理',
    titleDes: '',
  }),
  methods: {
    async init() {
      const { response } = await getTarkovBullets()

      return response
    },
    async remove(id) {
      await deleteTarkovBullet(id)
    },
    async put(editedItem) {
      const { response } = await putTarkovBullet(editedItem)

      return response
    },
    async post(editedItem) {
      const { response } = await postTarkovBullet(editedItem)

      return response
    },
  },
  setup() {
    return {}
  },
}
</script>
