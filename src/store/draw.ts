import { defineStore } from 'pinia'

import { requestDrawImage } from '@/utils/request'

import { useConfigStore } from './config'

export const useDrawStore = defineStore(
  '__AI_1024_STORE_CHAT',
  () => {
    const configStore = useConfigStore()
    const draws = ref<{ prompt: string; size: string; urls: string[] }>()
    onMounted(() => {})
    const imageDrawAction = (data: {
      size: string
      prompt: string
      n: number
      response_format: string
    }) => {
      requestDrawImage({ ...data, card: configStore.card })
    }
    return {
      draws,
      imageDrawAction
    }
  },
  // 保存到本地 localStorage
  {
    persist: {
      storage: localStorage
    }
  }
)
