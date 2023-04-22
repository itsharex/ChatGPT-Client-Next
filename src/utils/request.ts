import { useConfigStore } from '@/store/config'
import type { MessageModel } from '@/types/chat'

const TIME_OUT_MS = 60 * 60 * 3

export async function requestChatTitle(
  sendMessage: MessageModel,
  onMessage: (message: string) => void
) {
  const controller = new AbortController()
  const reqTimeoutId = setTimeout(() => controller.abort(), TIME_OUT_MS)
  try {
    const configStore = useConfigStore()
    const res = await fetch(
      `${configStore.bootstrap.api}/v1/chat/completions`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          path: `${configStore.bootstrap.api}/v1/chat/completions`
        },
        body: JSON.stringify(sendMessage)
      }
    )
    clearTimeout(reqTimeoutId)
    if (res.ok) {
      const text = await res.text()
      onMessage(text)
    }
  } catch (err) {
    console.error('NetWork Error', err)
  }
}

export async function requestChatStream(
  sendMessage: MessageModel,
  options?: {
    filterBot?: boolean
    onMessage: (message: string, done: boolean) => void
    onError: (error: Error, statusCode?: number) => void
    onController?: (controller: AbortController) => void
  }
) {
  const controller = new AbortController()
  const reqTimeoutId = setTimeout(() => controller.abort(), TIME_OUT_MS)
  try {
    const configStore = useConfigStore()
    const path = `${configStore.bootstrap.api}${CHAT_COMPLETIONS}`
    const res = await fetch(path, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        path
      },
      body: JSON.stringify(sendMessage),
      signal: controller.signal
    })
    clearTimeout(reqTimeoutId)

    let responseText = ''

    const finish = () => {
      options?.onMessage(responseText, true)
      controller.abort()
    }

    if (res.ok) {
      const reader = res.body?.getReader()
      const decoder = new TextDecoder()

      options?.onController?.(controller)

      // eslint-disable-next-line no-constant-condition
      while (true) {
        // handle time out, will stop if no response in 10 secs
        const resTimeoutId = setTimeout(() => finish(), TIME_OUT_MS)
        const content = await reader?.read()
        clearTimeout(resTimeoutId)
        const text = decoder.decode(content?.value)
        responseText += text
        const done = !content || content.done
        options?.onMessage(responseText, false)
        if (done) {
          break
        }
      }
      finish()
    } else if (res.status === 401) {
      console.error('Anauthorized')
      options?.onError(new Error('Anauthorized'), res.status)
    } else if (res.status === 500) {
      const text = await res.text()
      options?.onError(new Error(text), res.status)
    } else {
      console.error('Stream Error', res.body)
      options?.onError(new Error('Stream Error'), res.status)
    }
  } catch (err) {
    console.error('NetWork Error', err)
    options?.onError(err as Error)
  }
}

export async function requestDrawImage(
  sendData: any,
  options?: {
    onError: (error: Error, statusCode?: number) => void
    onController?: (controller: AbortController) => void
  }
) {
  const controller = new AbortController()
  const reqTimeoutId = setTimeout(() => controller.abort(), 180000)
  try {
    const configStore = useConfigStore()
    const path = `${configStore.bootstrap.api}${CHAT_COMPLETIONS}`
    const res = await fetch(path, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(sendData),
      signal: controller.signal
    })
    clearTimeout(reqTimeoutId)

    const responseText = ''

    const finish = () => {
      // options?.onMessage(responseText, true)
      controller.abort()
    }

    if (res.ok) {
      console.log(res)
      // const decoder = new TextDecoder()

      // options?.onController?.(controller)

      // // eslint-disable-next-line no-constant-condition
      // while (true) {
      //   // handle time out, will stop if no response in 10 secs
      //   const resTimeoutId = setTimeout(() => finish(), TIME_OUT_MS)
      //   const content = await reader?.read()
      //   clearTimeout(resTimeoutId)
      //   const text = decoder.decode(content?.value)
      //   responseText += text
      //   const done = !content || content.done
      //   options?.onMessage(responseText, false)
      //   if (done) {
      //     break
      //   }
      // }
      // finish()
    } else if (res.status === 401) {
      console.error('Anauthorized')
      options?.onError(new Error('Anauthorized'), res.status)
    } else if (res.status === 500) {
      const text = await res.text()
      options?.onError(new Error(text), res.status)
    } else {
      console.error('Stream Error', res.body)
      options?.onError(new Error('Stream Error'), res.status)
    }
  } catch (err) {
    console.error('NetWork Error', err)
    options?.onError(err as Error)
  }
}
