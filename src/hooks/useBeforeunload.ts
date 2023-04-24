export const useBeforeunload = (
  loading: Ref<boolean> | ComputedRef<boolean>
) => {
  const handleBeforeUnload = (event: any) => {
    if (loading) {
      event.returnValue = '浏览器正在关闭或刷新页面！'
    }
  }

  // const handleVisibilityChange = () => {
  //   if (document.visibilityState === 'hidden') {
  //     alert('您已经离开了页面！')
  //   }
  // }

  onMounted(() => {
    window.addEventListener('beforeunload', handleBeforeUnload)
    // document.addEventListener('visibilitychange', handleVisibilityChange)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('beforeunload', handleBeforeUnload)
    // document.removeEventListener('visibilitychange', handleVisibilityChange)
  })
}
