import { Message } from '@arco-design/web-vue'
import { defineStore } from 'pinia'

import type { ChatModel } from '@/types/chat'
import { SubmitKey } from '@/types/keys'
import type { ThemeMode } from '@/types/theme'

export const useConfigStore = defineStore(
  '__AI_1024_STORE_CONFIG',
  () => {
    const bootstrap = ref({
      $schema: '',
      api: '',
      modules: ['CHAT']
    })

    onMounted(() => {
      submitKey.value = SubmitKey.Enter
      if (!ALL_MODELS.includes(chatModel.value)) {
        chatModel.value = 'gpt-3.5-turbo'
      }
      fetch('/bootstrap.json')
        .then(res => res.json())
        .then(res => {
          bootstrap.value = res
          setupCardAction(card.value)
        })
    })
    // 侧边栏是否显示
    const collapsed = ref(false)

    // 主题
    const themeMode = ref<ThemeMode>('light')

    // 聊天模型
    const chatModel = ref<ChatModel>('gpt-3.5-turbo')

    // 积分卡
    const setupCardLoading = ref(false)
    const card = ref<string>('')
    const cardInfo = ref<{
      enable: boolean
      expire_time: string
      points: number
      remain_points: number
    }>()

    // 发送按键
    const submitKey = ref<SubmitKey>(SubmitKey.ShiftEnter)

    // 温度
    const temperature = ref<number>(0.7)

    useWindowSize(v => {
      collapsed.value = v
    })

    // 切换积分卡
    function setupCardAction(payload: string) {
      setupCardLoading.value = true
      card.value = payload
      const path = `${bootstrap.value.api}${QUERY_CARD}?card=${payload}`
      fetch(path)
        .then(res => res.json())
        .then(res => {
          if (res.code !== 200) {
            if (card.value) {
              Message.error(res.msg)
            }
            cardInfo.value = undefined
          } else {
            cardInfo.value = res.data
          }
        })
        .finally(() => {
          setupCardLoading.value = false
        })
    }

    // 切换主题模式
    function changeModeAction(mode: ThemeMode) {
      themeMode.value = mode
    }

    // 切换模型
    function changeChatModelAction(model: ChatModel) {
      chatModel.value = model
    }

    // 切换发送键
    function changeSubmitKeyAction(key: SubmitKey) {
      submitKey.value = key
    }

    // 改变温度
    function changeTemperatureAction(value: number) {
      if (value < 0.1) {
        temperature.value = 0.1
        return
      }
      if (value > 2) {
        temperature.value = 2
        return
      }
      temperature.value = value
    }

    // 监听主题模式的变化
    watchEffect(() => {
      if (themeMode.value === 'dark') {
        document.documentElement.classList.add('dark')

        document.body.setAttribute('arco-theme', 'dark')
      } else {
        document.documentElement.classList.remove('dark')
        document.body.removeAttribute('arco-theme')
      }
    })
    // 切换侧边栏是否显示
    const toggleCollapsedAction = () => {
      collapsed.value = !collapsed.value
    }

    return {
      card,
      cardInfo,
      bootstrap,
      collapsed,
      themeMode,
      chatModel,
      submitKey,
      temperature,
      setupCardLoading,
      setupCardAction,
      changeModeAction,
      toggleCollapsedAction,
      changeChatModelAction,
      changeSubmitKeyAction,
      changeTemperatureAction
    }
  },
  {
    persist: [
      {
        storage: localStorage,
        paths: [
          'themeMode',
          'chatModel',
          'card',
          'submitKey',
          'temperature',
          'cardInfo'
        ]
      }
    ]
  }
)
