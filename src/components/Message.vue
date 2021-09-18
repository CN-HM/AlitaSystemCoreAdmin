<template>
  <v-snackbar
    v-model="visible"
    top
    text
    :color="color"
    :timeout="timeout"
    :vertical="vertical"
  >
    {{ this.$store.state.message.msg }}
    <!-- 关闭按钮 -->
    <template v-slot:action="{ attrs }">
      <v-btn
        v-if="showClose"
        :color="color"
        v-bind="attrs"
        text
        @click="visible = false"
      >
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>
<script>
export default {
  computed: {
    vertical() {
      return this.$store.state.message.vertical
    },
    timeout() {
      return this.$store.state.message.timeout
    },
    visible: {
      get() {
        return this.$store.state.message.visible
      },
      set(val) {
        this.$store.state.message.visible = val
      },
    },
    showClose() {
      return this.$store.state.message.showClose
    },
    color() {
      return this.$store.state.message.color
    },
  },
  methods: {
  },
}
</script>
