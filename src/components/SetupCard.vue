<script setup lang="ts">
import { useConfigStore } from '@/store/config'

const configStore = useConfigStore()
const card = ref('')
const loading = computed(() => configStore.setupCardLoading)

const handleInputCard = (value: string) => {
  configStore.setupCardAction(value)
}

onMounted(() => {
  card.value = configStore.card
})
</script>

<template>
  <a-spin :loading="loading">
    <a-input-password
      :error="!configStore.cardInfo && !!configStore.card"
      v-model="card"
      @blur="handleInputCard"
      allow-clear
      placeholder="请输入积分卡"
    >
      <template v-if="!configStore.cardInfo && configStore.card" #suffix>
        <a-tooltip
          content="您的积分不足、积分卡已过期或输入错误。请检查并重新输入。"
          position="bottom"
          :content-style="{
            maxWidth: '240px',
            'margin-right': '16px'
          }"
        >
          <icon-info-circle class="cursor-pointer text-danger" />
        </a-tooltip>
      </template>
    </a-input-password>
  </a-spin>
</template>

<style scoped></style>
