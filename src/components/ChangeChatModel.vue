<script setup lang="tsx">
import { Button, Notification } from '@arco-design/web-vue'

import { useConfigStore } from '@/store/config'
import type { ChatModel } from '@/types/chat'

const configStore = useConfigStore()
const handleChangeMode = (value: string | number | Record<string, any>) => {
  if (String(value).indexOf('gpt-4') > -1) {
    Notification.clear()
    Notification.warning({
      title: '提示',
      closeIconElement: () => <Button size="mini">关闭</Button>,
      duration: 0,
      content: () => (
        <div class="whitespace-pre-wrap flex flex-col gap-y-1 leading-5">
          <strong>gpt-4成本昂贵</strong>
          <span>问题字数应该保持在1000token以下(大约500个汉字)</span>
          <span>
            尽量让ai一次性回复完。如果AI回答的内容过长，会造成内容截断，可以让AI继续回答，但是会消耗积分。
          </span>
        </div>
      ),
      closable: true
    })
  } else {
    Notification.clear()
  }
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
