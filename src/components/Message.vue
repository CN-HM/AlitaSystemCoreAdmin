<template>
  <v-snackbar
    top
    :value="visible"
    text
    :color="color"
    :vertical="vertical"
  >
    {{ this.$store.state.message.msg }}
    <!-- 关闭按钮 -->
    <template v-slot:action="{ attrs }">
      <v-btn
        text
        :color="color"
        v-if="showClose"
        v-bind="attrs"
        @click="visible = false"
      > Close </v-btn>
    </template>
  </v-snackbar>
</template>
<script>
export default {
  computed: {
    vertical() {
      return this.$store.state.message.vertical
    },
    visible() {
      return this.$store.state.message.visible
    },
    showClose() {
      return this.$store.state.message.showClose
    },
    color() {
      return this.$store.state.message.color
    },
  },
  methods: {},
}
</script>
