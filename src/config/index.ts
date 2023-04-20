import type { ChatModel } from '@/types/chat'

export const ALL_MODELS: ChatModel[] = [
  // 'gpt-4-32k-0314',
  // 'gpt-4-32k',
  'gpt-4-0314',
  'gpt-4',
  'gpt-3.5-turbo-0301',
  'gpt-3.5-turbo'
  // 'text-davinci-003',
  // 'text-davinci-002',
  // 'text-curie-001',
  // 'text-babbage-001',
  // 'text-ada-001',
  // 'text-davinci-001',
  // 'davinci-instruct-beta',
  // 'davinci',
  // 'curie-instruct-beta',
  // 'curie',
  // 'ada',
  // 'babbage'
]

// openai.GPT3Dot5Turbo0301:   4096,
// openai.GPT4:                8192,
// openai.GPT40314:            8192,
// openai.GPT432K:             32768,
// openai.GPT432K0314:         32768,
// openai.CodexCodeDavinci002: 8001,
// openai.CodexCodeDavinci001: 8001,
// openai.CodexCodeCushman001: 2048,
// openai.GPT3TextDavinci003:  4097,
// openai.GPT3TextDavinci002:  4097,
// openai.GPT3TextCurie001:    2049,
// openai.GPT3TextBabbage001:  2049,
// openai.GPT3TextAda001:      2049,
// openai.GPT3Davinci:         2049,
// openai.GPT3Curie:           2049,
// openai.GPT3Ada:             2049,
// openai.GPT3Babbage:         2049,
export const ALL_MODELS_MAX_TOKENS: Record<ChatModel, number> = {
  'gpt-4-32k-0314': 32768,
  'gpt-4-32k': 32768,
  'gpt-4-0314': 8192,
  'gpt-4': 8192,
  'gpt-3.5-turbo-0301': 2049,
  'gpt-3.5-turbo': 2049,
  'text-davinci-003': 4097,
  'text-davinci-002': 8001,
  'text-davinci-001': 8001,
  'text-curie-001': 2049,
  'text-babbage-001': 2049,
  'text-ada-001': 2049,
  'davinci-instruct-beta': 2049,
  davinci: 2049,
  'curie-instruct-beta': 2049,
  curie: 2049,
  ada: 2049,
  babbage: 2049
}

export const genTitleTemplate =
  '使用四到五个字直接返回这句话的简要主题，不要解释、不要标点、不要语气词、不要多余文本，如果没有主题，请直接返回“闲聊”'

/** 聊天接口 */
export const CHAT_COMPLETIONS = '/v1/chat/completions'

/** 查询卡密积分 */
export const QUERY_CARD = '/v1/card'
