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
  getTarkovArmors, deleteTarkovArmor, putTarkovArmor, postTarkovArmor,
} from '@/api/tarkovApi/tarkovArmor'

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
      // armorImageUrl: "https://alitasystem.net/armor/Zhuk-6a_heavy_armor_icon.png"
      // class: 6
      // createdTime: null
      // createdUserId: 0
      // durable: "75"
      // effectiveDurability: "94"
      // ergonomics: "-6"
      // id: 64
      // movingSpeed: "-13%"
      // turningSpeed: "-5%"
      // updatedTime: "2021-01-07 20:22:25"
      // updatedUserId: 0

      {
        text: '图片',
        align: 'start',
        value: 'armorImageUrl',
        sortable: false,
        editType: 'image',
        hidden: false,
      },
      {
        text: '名称',
        align: 'start',
        value: 'name',
        width: 200,
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
        sortable: true,
        rules: [v => (v != null && v.length > 0) || '请输入内容~'],
      },
      {
        text: '有效耐久度',
        align: 'end',
        value: 'effectiveDurability',
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
        text: '材质',
        align: 'start',
        value: 'material',
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
    title: '防弹衣管理',
    titleDes: '',
  }),
  methods: {
    async init() {
      const { response } = await getTarkovArmors()

      return response
    },
    async remove(id) {
      await deleteTarkovArmor(id)
    },
    async put(editedItem) {
      const { response } = await putTarkovArmor(editedItem)

      return response
    },
    async post(editedItem) {
      const { response } = await postTarkovArmor(editedItem)

      return response
    },
  },
  setup() {
    return {}
  },
}
</script>
