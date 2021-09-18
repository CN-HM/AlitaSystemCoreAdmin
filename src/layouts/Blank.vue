<template>
  <v-app>
    <v-main>
      <router-view></router-view>
      <message></message>
    </v-main>
  </v-app>
</template>

<script>
import Message from '@/components/Message.vue'

export default {
  components: {
    Message,
  },
}
</script>

<style>
</style>
