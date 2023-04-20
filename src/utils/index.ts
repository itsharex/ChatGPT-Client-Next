import type { MessageItem } from '@/types/chat'
export function createMessage(override: Partial<MessageItem>): MessageItem {
  return {
    id: genNonDuplicateID(),
    date: Date.now().valueOf(),
    role: 'user',
    content: '',
    ...override
  }
}
