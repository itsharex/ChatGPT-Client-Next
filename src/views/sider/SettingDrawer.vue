<script lang="ts" setup>
import SettingsView from '../main/SettingsView.vue'
const visible = ref(false)
</script>

<template>
  <a-button @click.stop="visible = true">系统设置</a-button>
  <a-drawer
    v-model:visible="visible"
    width="100%"
    :render-to-body="false"
    class="settings-drawer"
    title="设置中心"
    cancel-text="关闭"
    :drawer-style="{ maxWidth: '500px' }"
  >
    <SettingsView />
  </a-drawer>
</template>

<style scoped></style>
