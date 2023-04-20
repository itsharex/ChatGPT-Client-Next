import { onMounted, onUnmounted, ref } from 'vue'

function useWindowSize(callback?: (isMobile: boolean) => void) {
  const screenWidth = ref(window.innerWidth)

  const isMobileScreen = ref()

  const _isScreenWidthFn = () => {
    isMobileScreen.value = screenWidth.value < 844
  }
  watch(
    isMobileScreen,
    () => {
      if (callback) {
        callback(isMobileScreen.value)
      }
    },
    { immediate: true }
  )
  // 初始化执行
  _isScreenWidthFn()

  const updateWidth = () => {
    screenWidth.value = window.innerWidth
    _isScreenWidthFn()
  }

  onMounted(() => {
    window.addEventListener('resize', updateWidth)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', updateWidth)
  })

  return { screenWidth, isMobileScreen }
}

export default useWindowSize
