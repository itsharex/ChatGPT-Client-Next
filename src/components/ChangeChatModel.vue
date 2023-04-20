<script setup lang="ts">
import { useConfigStore } from '@/store/config'
import type { ChatModel } from '@/types/chat'

const configStore = useConfigStore()
const handleChangeMode = (value: string | number | Record<string, any>) => {
  configStore.changeChatModelAction(value as ChatModel)
}
</script>

<template>
  <a-select
    :model-value="configStore.chatModel"
    @change="handleChangeMode"
    :allow-clear="false"
    placeholder="Please select model..."
  >
    <a-option v-for="item in ALL_MODELS" :key="item" :value="item">
      {{ item }}
    </a-option>
  </a-select>
</template>

<style scoped></style>
