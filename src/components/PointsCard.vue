<script setup lang="ts">
import { useConfigStore } from '@/store/config'

const configStore = useConfigStore()

const setupCardLoading = computed(() => configStore.setupCardLoading)
</script>

<template>
  <a-card class="points-card" :loading="setupCardLoading" :bordered="false">
    <a-descriptions size="mini" :column="1">
      <a-descriptions-item label="账号">
        <span
          class="flex items-center gap-x-4"
          :class="[configStore.cardInfo ? 'text-primary' : 'text-danger']"
        >
          <span>{{ configStore.cardInfo ? '会员' : '游客' }}</span>
          <a-button
            size="mini"
            type="text"
            @click="configStore.setupCardAction(configStore.card)"
            shape="circle"
          >
            <icon-refresh />
          </a-button>
        </span>
      </a-descriptions-item>
      <a-descriptions-item label="状态">
        <a-badge
          size="small"
          :status="configStore.cardInfo?.enable ? 'processing' : 'danger'"
          :text="
            configStore.cardInfo
              ? configStore.cardInfo?.enable
                ? '正常'
                : '禁用'
              : '正常'
          "
        />
      </a-descriptions-item>
      <a-descriptions-item label="积分">
        <template v-if="configStore.cardInfo">
          <span class="text-primary">
            {{ configStore.cardInfo?.remain_points || 0 }}
          </span>
          /
          <span class="text-info">
            {{ configStore.cardInfo?.points || 0 }}
          </span>
        </template>
        <span v-else class="text-primary">每日五次免费调用</span>
      </a-descriptions-item>
    </a-descriptions>
  </a-card>
</template>

<style lang="less" scoped>
.points-card {
  @apply w-48 h-[100px] overflow-hidden rounded mb-2;
  &.is-chat {
    @apply dark:bg-dark mx-auto;
    background-color: #f2f3f5;
    width: calc(100% - 16px) !important;
  }
}
</style>
