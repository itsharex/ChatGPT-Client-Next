<script setup lang="ts">
import { Message } from '@arco-design/web-vue'
import { saveAs } from 'file-saver'

import { useChatStore } from '@/store/chat'

const visible = ref(false)
const chatStore = useChatStore()
const drawerTitle = computed(() => {
  return `导出聊天: ${chatStore.session?.topic || ''}`
})

const rawValue = computed(() => {
  const { session } = chatStore
  const messages = session?.messages ?? []
  // .filter(({ streaming, isError }) => !streaming && !isError)
  // .join(`\n\n---\n\n`)
  const messageRaw = messages.map(
    ({ content, role }) =>
      `\n## 来自${role === 'user' ? '您' : 'GPT'}的消息: \n${content}`
  )
  if (session?.topic) {
    messageRaw.unshift(`# ${session.topic}`)
  }
  return messageRaw.join(`\n`)
})
const handleSave = () => {
  const { session } = chatStore

  let str = new Blob([rawValue.value], { type: 'text/plain;charset=utf-8' })
  saveAs(str, session?.topic ? `${session.topic}.md` : '新的聊天.md')
}

const handleCopy = () => {
  copyText({ text: rawValue.value })
  Message.clear()
  Message.success('复制成功')
}
</script>

<template>
  <a-button @click="visible = true" size="small" type="text">
    <icon-share-external />
  </a-button>
  <a-drawer
    v-model:visible="visible"
    width="90%"
    :title="drawerTitle"
    class="message-drawer"
    cancel-text="复制文本"
    ok-text="导出文件(.md)"
    :drawer-style="{ maxWidth: '500px' }"
    @ok="handleSave"
    @cancel="handleCopy"
  >
    <div class="break-words break-all whitespace-pre-wrap">
      <message-content
        as-raw-text
        class="p-3 bg-[#fafafa] w-full hljs"
        :text="rawValue"
      ></message-content>
    </div>
  </a-drawer>
</template>

<style scoped></style>
