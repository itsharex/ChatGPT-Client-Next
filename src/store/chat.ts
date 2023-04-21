import { Message, Modal } from '@arco-design/web-vue'
import { encode } from 'gpt-token-utils'
import { cloneDeep } from 'lodash-es'
import { defineStore } from 'pinia'
import { ref } from 'vue'

import type { ChatItem, MessageItem, MessageModel } from '@/types/chat'
import { createMessage } from '@/utils'

import { ALL_MODELS_MAX_TOKENS } from './../config/index'
import { useConfigStore } from './config'

export const useChatStore = defineStore(
  '__AI_1024_STORE_CHAT',
  () => {
    const configStore = useConfigStore()
    const abortController = ref<AbortController>(new AbortController())
    const newChat: ChatItem = {
      id: genNonDuplicateID(),
      topic: '',
      sendMemory: true,
      messages: [],
      lastUpdate: new Date().getTime(),
      lastSummarizeIndex: 0
    }
    const currentChat = ref<string>()
    const sessions = ref<ChatItem[]>([])
    const session = ref<ChatItem>()
    const fetching = ref<boolean>(false)

    watchEffect(() => {
      session.value = sessions.value.find(({ id }) => id === currentChat.value)
    })

    /** 新加一个聊天 */
    const newChatAction = () => {
      if (abortController.value?.abort) {
        abortController.value?.abort()
      }
      const id = genNonDuplicateID()
      sessions.value.unshift(
        cloneDeep({
          ...newChat,
          topic: '',
          id
        })
      )
      currentChat.value = id
    }

    /** 清除会话 */
    const clearSessions = () => {
      if (abortController.value?.abort) {
        abortController.value?.abort()
      }
      Modal.warning({
        title: '操作提示',
        hideCancel: false,
        alignCenter: false,
        content: '是否确认移除所有会话信息, 此操作不可逆!!!',
        onOk() {
          sessions.value = []
          newChatAction()
        }
      })
    }

    /** 选中聊天 */
    const changeCurrentChatAction = (id: string) => {
      if (abortController.value?.abort) {
        abortController.value?.abort()
      }
      currentChat.value = id
    }

    /** 删除一个聊天 */
    const removeChatAction = (id: string) => {
      Modal.warning({
        title: '操作提示',
        hideCancel: false,
        alignCenter: false,
        content: '是否确认移除当前选择会话?',
        onOk() {
          // 如果删除的不是当前选中的 直接删除
          const index = sessions.value.findIndex(({ id }) => id === id)
          if (id !== currentChat.value) {
            sessions.value.splice(index, 1)
          } else {
            if (sessions.value.length > 1) {
              currentChat.value =
                sessions.value[index === 0 ? index + 1 : index - 1].id
            }
            sessions.value.splice(index, 1)
            if (abortController.value?.abort) {
              abortController.value?.abort()
            }
            if (sessions.value.length === 0) {
              newChatAction()
            }
          }
        }
      })
    }

    /** 根据id获取当前消息 */
    const getMessageById = (mId: string): MessageItem => {
      return session.value?.messages.find(({ id }) => mId === id)!
    }

    /** 修改当前会话标题 */
    const handleChangeSessionTopicAction = (v: string) => {
      session.value!.topic = v || session.value?.topic || ''
    }

    /** 获取需要携带的消息 */
    const getRequiredMessages = (curr: Partial<MessageItem>) => {
      const maxTokens = ALL_MODELS_MAX_TOKENS[configStore.chatModel] || 2049
      const res = <MessageItem[]>[]
      const sMs = (session.value?.messages || []).filter(item => !item.isError)
      // 当前所有的历史消息
      const messages = cloneDeep(sMs.concat(curr as MessageItem)).map(
        ({ role, content }) => ({ role, content })
      )
      let sum = 0
      try {
        messages.reverse().forEach((item, i) => {
          const tokens = encode(item.content).length
          if (tokens < maxTokens && sum + tokens < maxTokens) {
            sum += tokens
            res.push(item as MessageItem)
            // console.log(
            //   `当前聊天: ${item.content}, tokens: ${tokens}, sum: ${sum}`
            // )
          } else {
            throw new Error('')
          }
        })
      } catch (_) {
        //
      }
      console.log('最终Sum: ', sum)
      return res.reverse()
    }

    /** 发送消息 */
    const sendMessageAction = (
      content: string,
      onMessage?: (done: boolean) => void,
      appendUserMessage: boolean = true
    ) => {
      if (!content?.length) {
        Message.error('请输入您的消息')
        return
      }
      const messages = getRequiredMessages({ role: 'user', content })
      if (messages.length < 1) {
        const maxTokens = ALL_MODELS_MAX_TOKENS[configStore.chatModel] || 2049
        Message.error(`消息超出token限制: ${maxTokens}`)
        return
      }
      const reqData: MessageModel = {
        card: configStore.cardInfo?.enable ? configStore.card : undefined,
        messages,
        model: configStore.chatModel,
        is_stream: true
      }
      const userMessage: MessageItem = createMessage({
        role: 'user',
        content
      })
      if (appendUserMessage) {
        session.value!.messages.push(userMessage)
      }
      const botMessage: MessageItem = createMessage({
        role: 'assistant',
        streaming: true,
        content: ''
      })
      session.value!.messages.push(botMessage)

      fetching.value = true
      requestChatStream(reqData, {
        onController(ctl) {
          abortController.value = ctl
        },
        onMessage(message: string, done: boolean) {
          getMessageById(botMessage.id).content = message
          onMessage && onMessage(done)
          if (done) {
            fetching.value = false
            getMessageById(botMessage.id).streaming = false
            getMessageById(botMessage.id).date = new Date().valueOf()
            if (!session.value?.topic) {
              const topic = userMessage.content.trim().replace(/\r/g, '')
              session.value!.topic =
                topic.length > 30 ? topic.slice(0, 30) : topic
            }
          }
        },
        onError(error: Error, statusCode?: number) {
          fetching.value = false
          if (statusCode === 401) {
            getMessageById(botMessage.id).content =
              '现在是未授权状态，请输入积分卡'
          } else {
            getMessageById(botMessage.id).content +=
              statusCode !== undefined
                ? '\n\n' + `\`${error?.message || '出错了，稍后重试吧'}\``
                : '\n\n' + '`网络异常, 请稍后重试!`'
          }
          getMessageById(botMessage.id).streaming = false
          // userMessage.isError = true
          getMessageById(botMessage.id).isError = true
          getMessageById(botMessage.id).date = new Date().valueOf()
          onMessage && onMessage(true)
        }
      })
    }

    const messageRetryAction = (index: number, onMessage: () => void) => {
      session.value?.messages.splice(index, 1)
      const message = session.value?.messages[index - 1]
      sendMessageAction(message?.content || '', onMessage, false)
    }

    /** 初始化判断是否有聊天, 没有创建一个空的 */
    onMounted(() => {
      // sessions.value = []
      if (sessions.value?.length < 1) {
        newChatAction()
      }
    })
    return {
      session,
      sessions,
      fetching,
      currentChat,
      abortController,
      newChatAction,
      clearSessions,
      removeChatAction,
      sendMessageAction,
      messageRetryAction,
      changeCurrentChatAction,
      handleChangeSessionTopicAction
    }
  },
  // 保存到本地 localStorage
  {
    persist: {
      storage: localStorage
    }
  }
)
