<script setup lang="ts">
defineProps({
  text: {
    type: String
  }
})
</script>
<template>
  <div class="receiving-widget">
    <div class="loading"></div>
    <span v-if="text">{{ text }}</span>
  </div>
</template>

<style lang="less" scoped>
.receiving-widget {
  @apply w-full h-12 flex flex-col items-center justify-between text-xs;
}

.loading {
  height: 32px;
  @apply relative inline-block rounded w-1 text-primary;
  background: currentColor;
  animation: loading-animation 0.3s 0.3s linear infinite alternate;
}

.loading::after,
.loading::before {
  content: '';
  @apply absolute w-1 rounded top-1/2 left-4 transform -translate-y-1/2;
  height: 32px;
  background: currentColor;
  animation: loading-animation 0.3s 0.45s linear infinite alternate;
}

.loading::before {
  @apply -left-4 delay-0;
}

@keyframes loading-animation {
  0% {
    height: 32px;
  }
  100% {
    height: 4.8px;
  }
}
</style>
