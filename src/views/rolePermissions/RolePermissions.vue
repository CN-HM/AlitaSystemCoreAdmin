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
        <v-list
          two-line
          nav
        >
          <v-list-item-group
            v-model="selectedRoleId"
            color="primary"
          >
            <v-list-item
              v-for="item in roleItems"
              :key="item.roleName"
              :value="item.id"
              :disabled="item.isDeleted == 1"
              @click="getPermissionsByRoleId(item.id)"
            >
              <v-list-item-avatar>
                <v-icon>{{ icons.mdiAccountBox }}</v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title v-text="item.roleName"></v-list-item-title>
                <v-list-item-subtitle
                  class="text--primary"
                >
                  {{ item.description }}
                  <v-chip
                    class="ma-1"
                    :color="item.isDeleted == 1 ? 'warning' : 'success'"
                    small
                    :input-value="true"
                  >
                    <v-icon
                      left
                      small
                    >
                      {{ item.isDeleted == 1 ? icons.mdiCloseCircleOutline : icons.mdiCheckCircle }}
                    </v-icon>
                    {{ item.isDeleted == 1 ? '禁用' : '正常' }}
                  </v-chip>
                </v-list-item-subtitle>
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
        <v-list
          two-line
          nav
          :disabled="selectedRoleId == null"
        >
          <v-list-group
            v-for="items in permissionItems"
            :key="items.controllerName"
            :value="false"
          >
            <template v-slot:activator>
              <v-list-item-avatar>
                <v-icon>{{ icons.mdiShieldLockOutline }}</v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>{{ items.controllerName }}</v-list-item-title>
                <v-list-item-subtitle>
                  <v-chip
                    v-for="item in items.permissionItems"
                    :key="item.id"
                    class="ma-1"
                    :color="selectedPermissions.indexOf(item.id) !== -1 ? 'success' : 'warning'"
                    small
                    :input-value="true"
                  >
                    <v-icon
                      left
                      small
                    >
                      {{ selectedPermissions.indexOf(item.id) !== -1 ? icons.mdiCheckCircle : icons.mdiCloseCircleOutline }}
                    </v-icon>
                    {{ item.actionName }}
                  </v-chip>
                </v-list-item-subtitle>
              </v-list-item-content>
            </template>
            <v-list-item-group
              v-model="selectedPermissions"
              multiple
              color="primary"
            >
              <v-list-item
                v-for="permission in items.permissionItems"
                :key="permission.id"
                :value="permission.id"
                flat
                dense
                nav
                @change="permissionsChange(permission.id)"
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
  mdiAccountBox, mdiMagnify, mdiCheckCircle, mdiShieldLockOutline, mdiCloseCircleOutline,
} from '@mdi/js'
import getPermissionsTree from '@/api/permissionsTree'
import { getRolePermissions, putRolePermissions } from '@/api/rolePermissions'
import { getRoles } from '@/api/roles'

export default {
  data: () => ({
    selectedRoleId: undefined, // 选择的角色ID
    selectedPermissions: [], // 选择的权限数组
    search: '',
    active: [],
    roleItems: [],
    permissionItems: [],
    icons: {
      mdiAccountBox,
      mdiMagnify,
      mdiCheckCircle,
      mdiShieldLockOutline,
      mdiCloseCircleOutline,
    },
  }),
  computed: {
  },
  watch: {
  },
  created() {
    getRoles().then(res => {
      const { response } = res
      this.roleItems = response
    })
    getPermissionsTree().then(res => {
      const { response } = res
      this.permissionItems = response
    })
  },
  methods: {
    getColor(id) {
      return this.selectedPermissions.indexOf(id) !== -1 ? 'success' : 'warning'
    },
    getPermissionsByRoleId(id) {
      if (this.selectedRoleId === undefined) {
        getRolePermissions(id).then(res => {
          const { response } = res
          this.selectedPermissions = response
        })
      } else {
        this.selectedPermissions = []
      }
    },
    permissionsChange(id) {
      putRolePermissions({
        RoleId: this.selectedRoleId,
        PermissionId: id,
      }).then(res => {
        this.$store.dispatch('message/success', '权限设置成功~')
        console.log(res)
      })
    },
  },

  // setup() {
  //   const response = this.get()

  //   return {
  //     items: response,
  //   }
  // },
}
</script>
