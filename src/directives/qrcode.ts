import { qrcanvas } from 'qrcanvas'
import type { Directive, DirectiveHook } from 'vue'

import { useLayoutStore } from '@/store/layout'

const formatValue: DirectiveHook = (el, binding) => {
  const { value } = binding
  const layoutStore = useLayoutStore()
  const canvas = qrcanvas({
    size: 200,
    padding: 16,
    data: value,
    background: layoutStore.themeMode === 'dark' ? '#232324' : '#999999',
    foreground: layoutStore.themeMode === 'dark' ? '#f4f4f4' : '#000000'
  })
  el.innerHtml = ''
  el.appendChild(canvas)
}

export const qrCode: Directive = {
  mounted: formatValue,
  updated: formatValue
}
