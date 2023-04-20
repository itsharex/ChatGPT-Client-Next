<script setup lang="ts"></script>

<template>
  <a-scrollbar
    outer-style="flex: 1; overflow: hidden;"
    class="overflow-y-auto h-full p-4 flex flex-col gap-y-2"
  >
    <div class="max-w-4xl w-full mx-auto">
      <a-breadcrumb class="my-6">
        <a-breadcrumb-item>
          <a-link @click="$router.back">
            <icon-arrow-left />
            返回
          </a-link>
        </a-breadcrumb-item>
        <a-breadcrumb-item>工具库</a-breadcrumb-item>
      </a-breadcrumb>
      <a-result status="404" subtitle="Toolbox development in progress...">
        <template #extra>
          <a-button @click="$router.back()" type="primary">Back</a-button>
        </template>
      </a-result>
    </div>
  </a-scrollbar>
</template>

<style scoped lang="less">
.setting-card {
  @apply bg-white rounded-md py-4 flex flex-col gap-y-4 px-6;
}
</style>
