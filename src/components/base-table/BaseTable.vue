<template>
  <!-- basic -->
  <v-row>
    <v-col cols="12">
      <v-card>
        <v-card-title>{{ title }}</v-card-title>
        <v-card-text>
          {{ titleDes }}
        </v-card-text>
        <v-card-text>
          <template>
            <!-- 表格 -->
            <v-data-table
              :loading="loading"
              fixed-header
              height="41rem"
              :headers="baseHeaders"
              :items="desserts"
              :page.sync="basePage"
              :items-per-page="baseItemsPerPage"
              :search="search"
              multi-sort
              hide-default-footer
              class="elevation-1"
              loading-text="Loading... Please wait"
              @page-count="basePageCount = $event"
            >
              <!-- 表格工具栏 -->
              <template v-slot:top>
                <v-toolbar bottom>
                  <v-dialog v-model="dialog" max-width="600px">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn color="primary" :hidden="!baseCreateStatus" v-bind="attrs" v-on="on"> 新建 </v-btn>
                    </template>
                    <v-form ref="editForm" lazy-validation>
                      <v-card>
                        <v-card-title>
                          <span class="text-h5">{{ formTitle }}</span>
                        </v-card-title>

                        <v-card-text>
                          <v-container>
                            <v-row>
                              <v-col
                                v-for="(item, i) in baseHeaders.filter(c => !c.hidden)"
                                :key="i"
                                cols="12"
                                sm="6"
                                md="4"
                              >
                                <!--普通文本 -->
                                <v-text-field
                                  v-if="item.editType == undefined || item.editType == null || item.editType == ''"
                                  v-model="baseEditedItem[item.value]"
                                  :label="item.text"
                                  :rules="item.rules"
                                ></v-text-field>
                                <!-- 多行文本 -->
                                <v-textarea
                                  v-else-if="item.editType == 'textarea'"
                                  v-model="baseEditedItem[item.value]"
                                  :label="item.text"
                                  :rules="item.rules"
                                  rows="1"
                                ></v-textarea>
                                <!-- 开关 -->
                                <v-switch
                                  v-else-if="item.editType == 'switch'"
                                  v-model="baseEditedItem[item.value]"
                                  color="primary"
                                  :label="item.text"
                                  :rules="item.rules"
                                ></v-switch>
                                <!-- 下拉选择框 -->
                                <v-autocomplete
                                  v-else-if="item.editType == 'autocomplete'"
                                  v-model="baseEditedItem[item.value]"
                                  :items="item[item.value + 'List']"
                                  color="primary"
                                  :label="item.text"
                                  :rules="item.rules"
                                  item-text="text"
                                  item-value="value"
                                >
                                </v-autocomplete>
                              </v-col>
                            </v-row>
                          </v-container>
                        </v-card-text>

                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn color="blue darken-1" text @click="close"> 取消 </v-btn>
                          <v-btn color="primary" text @click="save"> 保存 </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-form>
                  </v-dialog>
                  <v-spacer></v-spacer>
                  <!-- 搜索 -->
                  <v-text-field v-model="search" label="搜索" single-line hide-details>
                    <v-icon slot="append" color="red">
                      {{ icons.mdiMagnify }}
                    </v-icon>
                  </v-text-field>
                  <v-dialog v-model="dialogDelete" max-width="628px">
                    <v-card>
                      <v-card-title>
                        <span class="text-h5">删除</span>
                      </v-card-title>
                      <v-card-text> 你确定要删除这个对象吗? </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="closeDelete"> 取消 </v-btn>
                        <v-btn color="primary" text @click="deleteItemConfirm"> 确认 </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-toolbar>
              </template>
              <template
                v-for="header in headers.filter(c => c.editType != undefined)"
                v-slot:[`item.${header.value}`]="{ item }"
              >
                <div :key="header.value">
                  <!-- 通用头像 -->
                  <v-avatar size="36px" v-if="header.editType == 'image'">
                    <img :src="item[header.value]" alt="" />
                  </v-avatar>
                  <!-- 通用状态模板 -->
                  <v-chip small :color="getColor(item.isDeleted)" v-else-if="header.editType == 'switch'">
                    {{ item.isDeleted === 0 ? '正常' : '禁用' }}
                  </v-chip>
                  <!-- 通用操作栏模板 -->
                  <v-item-group multiple v-else-if="header.editType == 'actions'">
                    <v-item>
                      <v-icon small class="mr-2" @click="editItem(item)">
                        {{ icons.mdiPencil }}
                      </v-icon>
                    </v-item>
                    <v-item>
                      <v-icon small @click="deleteItem(item)">
                        {{ icons.mdiDelete }}
                      </v-icon>
                    </v-item>
                  </v-item-group>
                </div>
              </template>
            </v-data-table>
            <div class="text-center" style="height: 4rem">
              <v-row justify="center">
                <v-col cols="6">
                  <v-container class="max-width">
                    <v-pagination v-model="basePage" circle :length="basePageCount"></v-pagination>
                  </v-container>
                </v-col>
              </v-row>
            </div>
          </template>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mdiMagnify, mdiPencil, mdiCircleEditOutline, mdiDelete } from '@mdi/js'
import deepClone from '@/utils/deep-clone'

export default {
  props: {
    // 标题描述
    title: {
      type: String,
      required: true,
      default: '',
    },

    // 标题描述
    titleDes: {
      type: String,
      required: true,
      default: '',
    },

    // 当前页数
    page: {
      type: Number,
      required: true,
      default: 1,
    },

    // 页面数量
    pageCount: {
      type: Number,
      required: true,
      default: 1,
    },

    // 每页行数量
    itemsPerPage: {
      type: Number,
      required: true,
      default: 0,
    },

    // 默认对象
    defaultItem: {
      type: Object,
      required: true,
      default: null,
    },

    // 编辑对象
    editedItem: {
      type: Object,
      required: true,
      default: null,
    },

    // 表头
    headers: {
      type: Array,
      required: true,
      default: null,
    },

    // 是否开启新建
    createStatus: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data: () => ({
    loading: true,
    search: '',
    dialog: false,
    dialogDelete: false,
    desserts: [],
    editedIndex: -1,
    icons: {
      mdiMagnify,
      mdiPencil,
      mdiCircleEditOutline,
      mdiDelete,
    },
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? '新增' : '编辑'
    },
  },
  watch: {
    dialog(val) {
      // eslint-disable-next-line no-unused-expressions
      val ? this.$refs.editForm === undefined || this.$refs.editForm.resetValidation() : this.close()
    },
    dialogDelete(val) {
      // eslint-disable-next-line no-unused-expressions
      val || this.closeDelete()
    },
  },
  async created() {
    await this.initialize()
  },
  methods: {
    getColor(isDeleted) {
      return isDeleted === 0 ? 'success' : 'error'
    },
    async initialize() {
      this.desserts = await this.$parent.init()
      this.loading = false
    },
    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.baseEditedItem = { ...item }
      this.dialog = true
    },
    deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.baseEditedItem = { ...item }
      this.dialogDelete = true
    },
    async deleteItemConfirm() {
      await this.$parent.remove(this.baseEditedItem.id)
      this.desserts.splice(this.editedIndex, 1)
      this.closeDelete()
    },
    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.baseEditedItem = { ...this.baseDefaultItem }
        this.editedIndex = -1
      })
    },
    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.baseEditedItem = { ...this.baseDefaultItem }
        this.editedIndex = -1
      })
    },
    async save() {
      // 验证
      if (this.$refs.editForm.validate()) {
        this.baseEditedItem.isDeleted = this.baseEditedItem.isDeleted ? 1 : 0
        let response = null
        if (this.editedIndex > -1) {
          response = await this.$parent.put(this.baseEditedItem)
          Object.assign(this.desserts[this.editedIndex], response)
        } else {
          response = await this.$parent.post(this.baseEditedItem)
          this.desserts.push(response)
        }
        this.close()
      }
    },
  },
  setup(props) {
    // 深克隆
    const cloneProps = deepClone(props)
    return {
      baseHeaders: cloneProps.headers,
      baseCreateStatus: cloneProps.createStatus,
      baseEditedItem: cloneProps.editedItem,
      baseDefaultItem: cloneProps.defaultItem,
      baseItemsPerPage: cloneProps.itemsPerPage,
      basePageCount: cloneProps.pageCount,
      basePage: cloneProps.page,
    }
  },
}
</script>
