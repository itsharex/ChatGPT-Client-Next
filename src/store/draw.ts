import { Message } from '@arco-design/web-vue'
import { defineStore } from 'pinia'

import { requestDrawImage } from '@/utils/request'

import { useConfigStore } from './config'

export const useDrawStore = defineStore(
  '__AI_1024_STORE_DRAW',
  () => {
    const configStore = useConfigStore()
    const loading = ref(false)
    const draws = ref<
      {
        prompt: string
        size: string
        urls: string[]
        date: number
      }[]
    >([])
    onMounted(() => {})

    const imageDrawAction = (req: {
      size: string
      prompt: string
      n: number
      response_format: string
    }) => {
      loading.value = true
      requestDrawImage(
        { ...req, card: configStore.card },
        {
          onController(controller) {
            console.log(controller)
          },
          onSuccess(resp) {
            loading.value = false
            draws.value.push({
              prompt: req.prompt,
              size: req.size,
              urls: resp.data.map(
                item => `data:image/png;base64, ${item.b64_json}`
              ),
              date: resp.created
            })
          },
          onError(error) {
            loading.value = false
            Message.error(error?.message ?? '')
          }
        }
      )
    }
    return {
      draws,
      loading,
      imageDrawAction
    }
  },
  // 保存到本地 localStorage
  {
    persist: {
      storage: localStorage,
      paths: ['draws']
    }
  }
)
