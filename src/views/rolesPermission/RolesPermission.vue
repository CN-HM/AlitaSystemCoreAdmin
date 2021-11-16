<template>
  <v-card>
    <v-card-title class="indigo white--text text-h5">
      角色权限管理
    </v-card-title>
    <v-card-text>
      角色权限管理页面用于配置角色的权限。
    </v-card-text>
    <v-row
      class="pa-4"
      justify="space-between"
    >
      <!-- 角色 -->
      <v-col cols="5">
        <v-toolbar>
          <v-btn
            icon
            color="primary"
          >
            <v-icon>{{ icons.mdiAccountBox }}</v-icon>
          </v-btn>
          <v-toolbar-title>角色列表</v-toolbar-title>

          <v-spacer></v-spacer>

          <!-- 搜索 -->
          <v-text-field
            v-model="search"
            label="搜索"
            single-line
            hide-details
          >
            <v-icon
              slot="append"
            >
              {{ icons.mdiMagnify }}
            </v-icon>
          </v-text-field>
        </v-toolbar>
        <v-list>
          <v-list-item-group
            color="primary"
          >
            <v-list-item
              v-for="items in roleItems"
              :key="items.roleName"
              :disabled="items.isDeleted"
            >
              <v-list-item-avatar>
                <v-icon>{{ icons.mdiAccountBox }}</v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title v-text="items.roleName"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-col>

      <v-divider vertical></v-divider>
      <!-- 权限 -->
      <v-col>
        <v-toolbar>
          <v-btn
            icon
            color="primary"
          >
            <v-icon>{{ icons.mdiShieldLockOutline }}</v-icon>
          </v-btn>

          <v-toolbar-title>
            权限列表
          </v-toolbar-title>

          <v-spacer></v-spacer>

          <!-- 搜索 -->
          <v-text-field
            v-model="search"
            label="搜索"
            single-line
            hide-details
          >
            <v-icon
              slot="append"
            >
              {{ icons.mdiMagnify }}
            </v-icon>
          </v-text-field>
        </v-toolbar>
        <v-list three-line>
          <v-list-group
            v-for="items in permissionItems"
            :key="items.controllerName"
            :value="false"
            three-line
          >
            <template v-slot:activator>
              <v-list-item-avatar>
                <v-icon>{{ icons.mdiShieldLockOutline }}</v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>{{ items.controllerName }}</v-list-item-title>
                <v-list-item-subtitle>
                  <v-chip
                    color="success"
                    small
                    filter
                    outlined
                    :input-value="true"
                    :filter-icon="icons.mdiCheckboxOutline"
                  >
                    获取
                  </v-chip>
                </v-list-item-subtitle>
              </v-list-item-content>
            </template>
            <v-list-item-group
              multiple
              color="primary"
            >
              <v-list-item
                v-for="permission in items.permissionItems"
                :key="permission.id"
                subheader
                three-line
                flat
                link
              >
                <template v-slot:default="{ active }">
                  <v-list-item-action>
                    <v-checkbox :input-value="active"></v-checkbox>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title>{{ permission.actionName }}</v-list-item-title>
                    <v-list-item-subtitle>{{ permission.description }}</v-list-item-subtitle>
                  </v-list-item-content>
                </template>
              </v-list-item>
            </v-list-item-group>
          </v-list-group>
        </v-list>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import {
  mdiAccountBox, mdiMagnify, mdiCheckboxOutline, mdiShieldLockOutline,
} from '@mdi/js'
import getPermissionsTree from '@/api/permissionsTree'
import { getRoles } from '@/api/roles'

export default {
  data: () => ({
    search: '',
    active: [],
    avatar: null,
    open: [],
    roles: [],
    roleItems: [],
    permissionItems: [],
    icons: {
      mdiAccountBox,
      mdiMagnify,
      mdiCheckboxOutline,
      mdiShieldLockOutline,
    },
  }),
  computed: {
    selected() {
      if (!this.active.length) return undefined

      const id = this.active[0]

      return this.roles.find(user => user.id === id)
    },
  },
  watch: {
    selected: '',
  },
  async created() {
    this.roleItems = (await getRoles()).response

    this.permissionItems = (await getPermissionsTree()).response
  },
  methods: {
  },

  // setup() {
  //   const response = this.get()

  //   return {
  //     items: response,
  //   }
  // },
}
</script>
