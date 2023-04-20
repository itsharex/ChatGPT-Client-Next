<script setup lang="ts">
import { useChatStore } from '@/store/chat'

const visible = ref(false)
const topic = ref('')
const chatStore = useChatStore()
const handleBeforeOk = () => {
  chatStore.handleChangeSessionTopicAction(topic.value)
}

const handleBeforeOpen = () => {
  topic.value = chatStore.session?.topic || '新的聊天'
}
</script>

<template>
  <div @click="visible = true">
    <slot></slot>
  </div>
  <a-modal
    @before-open="handleBeforeOpen"
    v-model:visible="visible"
    title="修改会话标题"
    hide-cancel
    :modal-style="{ 'max-width': '80%' }"
    @ok="handleBeforeOk"
  >
    <a-input
      :max-length="30"
      v-model="topic"
      placeholder="请输入当前会话标题"
    />
  </a-modal>
</template>

<style scoped></style>
