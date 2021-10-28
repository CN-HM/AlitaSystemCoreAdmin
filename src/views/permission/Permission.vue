<template>
  <v-row>
    <!-- basic -->
    <v-col cols="12">
      <v-card>
        <v-card-title>权限管理</v-card-title>
        <v-card-text>
          权限管理页面用于配置权限的开启、关闭、编辑，权限不可删除。
        </v-card-text>
        <v-card-text>
          <template>
            <!-- 表格 -->
            <v-data-table
              :headers="headers"
              :items="desserts"
              :page.sync="page"
              :items-per-page="itemsPerPage"
              :search="search"
              group-by="controllerName"
              multi-sort
              hide-default-footer
              class="elevation-1"
              @page-count="pageCount = $event"
            >
              <!-- 表格工具栏 -->
              <template v-slot:top>
                <v-toolbar
                  flat
                >
                  <v-dialog
                    v-model="dialog"
                    max-width="500px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        color="primary"
                        dark
                        class="mb-2"
                        v-bind="attrs"
                        v-on="on"
                      >
                        新增
                      </v-btn>
                    </template>
                    <v-card>
                      <v-card-title>
                        <span class="text-h5">{{ formTitle }}</span>
                      </v-card-title>

                      <v-card-text>
                        <v-container>
                          <v-row>
                            <v-col
                              cols="12"
                              sm="6"
                              md="4"
                            >
                              <v-text-field
                                v-model="editedItem.controllerName"
                                label="控制器名称"
                              ></v-text-field>
                            </v-col>
                            <v-col
                              cols="12"
                              sm="6"
                              md="4"
                            >
                              <v-text-field
                                v-model="editedItem.controller"
                                label="控制器"
                              ></v-text-field>
                            </v-col>
                            <v-col
                              cols="12"
                              sm="6"
                              md="4"
                            >
                              <v-text-field
                                v-model="editedItem.actionName"
                                label="Action名称"
                              ></v-text-field>
                            </v-col>
                            <v-col
                              cols="12"
                              sm="6"
                              md="4"
                            >
                              <v-text-field
                                v-model="editedItem.action"
                                label="Action"
                              ></v-text-field>
                            </v-col>
                          </v-row>
                          <v-row>
                            <v-col
                              cols="24"
                              sm="6"
                              md="4"
                            >
                              <v-switch
                                v-model="editedItem.isDeleted"
                                color="primary"
                                label="是否禁用"
                              ></v-switch>
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-card-text>

                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                          color="blue darken-1"
                          text
                          @click="close"
                        >
                          取消
                        </v-btn>
                        <v-btn
                          color="primary"
                          text
                          @click="save"
                        >
                          保存
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                  <v-spacer></v-spacer>
                  <v-text-field
                    v-model="search"
                    label="搜索"
                    single-line
                    hide-details
                  >
                    <v-icon
                      slot="append"
                      color="red"
                    >
                      {{ icons.mdiMagnify }}
                    </v-icon>
                  </v-text-field>
                  <v-dialog
                    v-model="dialogDelete"
                    max-width="500px"
                  >
                    <v-card>
                      <v-card-title>
                        <span class="text-h5">删除</span>
                      </v-card-title>
                      <v-card-text>
                        你确定要删除这个对象吗?
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                          color="blue darken-1"
                          text
                          @click="closeDelete"
                        >
                          取消
                        </v-btn>
                        <v-btn
                          color="primary"
                          text
                          @click="deleteItemConfirm"
                        >
                          确认
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-toolbar>
              </template>
              <!-- 表格操作栏 -->
              <template v-slot:[`item.actions`]="{ item }">
                <v-icon
                  small
                  class="mr-2"
                  @click="editItem(item)"
                >
                  {{ icons.mdiPencil }}
                </v-icon>
                <v-icon
                  small
                  @click="deleteItem(item)"
                >
                  {{ icons.mdiDelete }}
                </v-icon>
              </template>
              <!-- 自定义表头 -->
              <template v-slot:[`item.isDeleted`]="{ item }">
                <v-chip
                  :color="getColor(item.isDeleted)"
                >
                  {{ item.isDeleted === 0 ? '正常' : '禁用' }}
                </v-chip>
              </template>
            </v-data-table>
            <div class="text-center pt-2">
              <v-row justify="center">
                <v-col cols="6">
                  <v-container class="max-width">
                    <v-pagination
                      v-model="page"
                      circle
                      :length="pageCount"
                    ></v-pagination>
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
import {
  mdiMagnify, mdiPencil, mdiCircleEditOutline, mdiDelete,
} from '@mdi/js'
import {
  getAllPermissions, DeletePermissions, PutPermissions, PostPermissions,
} from '@/api/permission'

export default {
  data: () => ({
    search: '',
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: '控制器名称', align: 'start', value: 'controllerName', sortable: true,
      },
      {
        text: '控制器', align: 'start', value: 'controller', sortable: true,
      },
      {
        text: 'Action名称', align: 'start', value: 'actionName', sortable: true,
      },
      {
        text: 'Action', align: 'start', value: 'action', sortable: true,
      },
      {
        text: '是否禁用', align: 'start', value: 'isDeleted', sortable: true,
      },
      {
        text: '创建时间', align: 'start', value: 'createdTime', sortable: true,
      },
      {
        text: '创建人', align: 'start', value: 'createdUserName', sortable: true,
      },
      {
        text: '更新时间', align: 'start', value: 'updatedTime', sortable: true,
      },
      {
        text: '更新人', align: 'start', value: 'updatedUserName', sortable: true,
      },
      { text: '操作', value: 'actions', sortable: false },
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      // TODO 對接後臺接口
      action: '',
      actionName: '',
      controller: '',
      controllerName: '',
      isDeleted: 0,
    },
    defaultItem: {
      action: '',
      actionName: '',
      controller: '',
      controllerName: '',
      createdTime: '',
      createdUserId: 1,
      createdUserName: '',
      isDeleted: 0,
      updatedTime: '',
      updatedUserId: 1,
      updatedUserName: '',
    },
    icons: {
      mdiMagnify,
      mdiPencil,
      mdiCircleEditOutline,
      mdiDelete,
    },
    page: 1,
    pageCount: 0,
    itemsPerPage: 30,
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? '新增' : '编辑'
    },
  },

  watch: {
    dialog(val) {
      // eslint-disable-next-line no-unused-expressions
      val || this.close()
    },
    dialogDelete(val) {
      // eslint-disable-next-line no-unused-expressions
      val || this.closeDelete()
    },
  },

  created() {
    this.initialize()
  },

  methods: {
    getColor(isDeleted) {
      return isDeleted === 0 ? 'success' : 'error'
    },
    async initialize() {
      const { response } = await getAllPermissions()
      this.desserts = response
    },
    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = { ...item }
      this.dialog = true
    },
    deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = { ...item }
      this.dialogDelete = true
    },
    async deleteItemConfirm() {
      await DeletePermissions(this.editedItem.id)
      this.desserts.splice(this.editedIndex, 1)
      this.closeDelete()
    },
    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = { ...this.defaultItem }
        this.editedIndex = -1
      })
    },
    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = { ...this.defaultItem }
        this.editedIndex = -1
      })
    },
    async save() {
      this.editedItem.isDeleted = this.editedItem.isDeleted ? 1 : 0
      if (this.editedIndex > -1) {
        const { response } = await PutPermissions(this.editedItem)
        Object.assign(this.desserts[this.editedIndex], response)
      } else {
        const { response } = await PostPermissions(this.editedItem)
        this.desserts.push(response)
      }
      this.close()
    },
  },
}
</script>
