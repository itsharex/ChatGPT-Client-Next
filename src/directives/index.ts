import type { App } from 'vue'

import { dateTime } from './date-time'
import { qrCode } from './qrcode'

export const setupDirectives = (app: App) => {
  app.directive('qr', qrCode)
  app.directive('date-time', dateTime)
}
