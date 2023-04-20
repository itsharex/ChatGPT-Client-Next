import { Message } from '@arco-design/web-vue'
import { onMounted, onUpdated } from 'vue'

export function useCopyCode() {
  function copyCodeBlock() {
    const codeBlockWrapper = document.querySelectorAll('.code-block-wrapper')
    codeBlockWrapper.forEach(wrapper => {
      const copyBtn = wrapper.querySelector('.code-block-header__copy')
      const codeBlock = wrapper.querySelector('.code-block-body')
      if (copyBtn && codeBlock) {
        copyBtn.addEventListener('click', () => {
          if (navigator.clipboard?.writeText) {
            navigator.clipboard.writeText(codeBlock.textContent ?? '')
            Message.clear()
            Message.success('复制成功')
          } else {
            copyText({ text: codeBlock.textContent ?? '', origin: true })
            Message.clear()
            Message.success('复制成功')
          }
        })
      }
    })
  }

  onMounted(() => copyCodeBlock())

  onUpdated(() => copyCodeBlock())
}
