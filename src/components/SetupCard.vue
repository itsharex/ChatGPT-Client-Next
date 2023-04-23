<script setup lang="ts">
import { useConfigStore } from '@/store/config'

const configStore = useConfigStore()
const card = ref('')
const loading = computed(() => configStore.setupCardLoading)

const handleInputCard = () => {
  if (card.value === configStore.card) {
    return
  }
  configStore.setupCardAction(card.value)
}

onMounted(() => {
  card.value = configStore.card
})
</script>

<template>
  <a-spin :loading="loading">
    <a-input
      :error="!configStore.cardInfo && !!configStore.card"
      v-model="card"
      type="password"
      @blur="handleInputCard"
      allow-clear
      placeholder="请输入积分卡"
    >
      <template #suffix>
        <div class="flex items-center">
          <a-typography-paragraph
            v-if="card"
            class="mb-0"
            copyable
            :copy-text="card"
          >
          </a-typography-paragraph>
          <a-tooltip
            v-if="!configStore.cardInfo && configStore.card"
            content="您的积分不足、积分卡已过期或输入错误。请检查并重新输入。"
            position="bottom"
            :content-style="{
              maxWidth: '240px',
              'margin-right': '16px'
            }"
          >
            <icon-info-circle class="cursor-pointer text-danger" />
          </a-tooltip>
        </div>
      </template>
    </a-input>
  </a-spin>
</template>

<style scoped></style>
