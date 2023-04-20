<script lang="ts" setup>
import MessageList from './MessageList.vue'
</script>

<template>
  <a-drawer
    width="100%"
    hide-cancel
    placement="left"
    :header="false"
    :footer="false"
    class="message-drawer"
    :drawer-style="{ maxWidth: '350px' }"
  >
    <MessageList is-drawer />
  </a-drawer>
</template>

<style scoped></style>
