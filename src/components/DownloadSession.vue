<script setup lang="ts">
import { useChatStore } from '@/store/chat'

const visible = ref(false)
const chatStore = useChatStore()
const drawerTitle = computed(() => {
  return `下载聊天: ${chatStore.session?.topic || ''}`
})

const rawValue = computed(() => {
  const { session } = chatStore
  const messages = session?.messages ?? []
  // .join(`\n\n---\n\n`)
  const messageRaw = messages.map(({ content }) => `\n${content}\n`)
  if (session?.topic) {
    messageRaw.unshift(`# ${session.topic}`)
  }
  return messageRaw.join(`\n\n---\n\n`)
})
</script>

<template>
  <a-button @click="visible = true" size="small" type="text">
    <icon-download />
  </a-button>
  <a-drawer
    v-model:visible="visible"
    width="90%"
    :title="drawerTitle"
    hide-cancel
    :footer="false"
    class="message-drawer"
    :drawer-style="{ maxWidth: '500px' }"
  >
    <div class="break-words break-all whitespace-pre-wrap">
      {{ rawValue }}
    </div>
  </a-drawer>
</template>

<style scoped></style>
