import { Message } from '@arco-design/web-vue'
import { defineStore } from 'pinia'

import { requestDrawImage } from '@/utils/request'

import { useConfigStore } from './config'

export const useDrawStore = defineStore(
  '__AI_1024_STORE_DRAW',
  () => {
    const configStore = useConfigStore()
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
      alert('imageDrawAction')
      requestDrawImage(
        { ...req, card: configStore.card },
        {
          onController(controller) {
            console.log(controller)
          },
          onSuccess(resp) {
            draws.value.push({
              prompt: req.prompt,
              size: req.size,
              urls: resp.data.map(item => item.url),
              date: resp.created
            })
          },
          onError(error) {
            Message.error(error?.message ?? '')
          }
        }
      )
    }
    return {
      draws,
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
