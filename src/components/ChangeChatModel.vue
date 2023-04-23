<script setup lang="tsx">
import { Modal } from '@arco-design/web-vue'

import { useConfigStore } from '@/store/config'
import type { ChatModel } from '@/types/chat'

const configStore = useConfigStore()
const handleChangeMode = async (
  value: string | number | Record<string, any>
) => {
  if (String(value).indexOf('gpt-4') > -1) {
    await new Promise<void>((resolve, reject) => {
      Modal.warning({
        title: '提示',
        okText: '继续',
        hideCancel: false,
        content: () => (
          <div class="whitespace-pre-wrap flex flex-col gap-y-1 leading-5 indent">
            请注意：由于 GPT-4 模型的成本较高，因此问题字数应保持在 1000 个
            token 以下（大约 500 个汉字）。如果超出该限制，将自动截断。为了避免
            AI 回答内容截断，建议尽量让 AI 一次性回复完整个问题。如果 AI
            回答的内容过长，也会造成内容截断，进而引起回复不连贯。是否确认切换至
            GPT-4？
          </div>
        ),
        onOk() {
          resolve()
          configStore.changeChatModelAction(value as ChatModel)
        },
        onCancel() {
          reject()
        }
      })
    })
    // Notification.clear()
    // Notification.warning({
    //   title: '提示',
    //   closeIconElement: () => <Button size="mini">关闭</Button>,
    //   duration: 0,
    //   content: () => (
    //     <div class="whitespace-pre-wrap flex flex-col gap-y-1 leading-5">
    //       <strong>gpt-4成本昂贵</strong>
    //       <span>问题字数应该保持在1000token以下(大约500个汉字)</span>
    //       <span>
    //         尽量让ai一次性回复完。如果AI回答的内容过长，会造成内容截断，可以让AI继续回答，但是会消耗积分。
    //       </span>
    //     </div>
    //   ),
    //   closable: true
    // })
  } else {
    configStore.changeChatModelAction(value as ChatModel)
  }
}
</script>

<template>
  <a-select
    :model-value="configStore.chatModel"
    @change="handleChangeMode"
    :allow-clear="false"
    placeholder="Please select model..."
  >
    <template #label="{ data }">
      {{ data.value }}
    </template>
    <a-option v-for="item in ALL_MODELS" :key="item" :value="item">
      {{ item }}
      <small class="text-info">({{ POINTS_MAP[item] }}积分一次)</small>
    </a-option>
  </a-select>
</template>

<style scoped></style>
