const webps = import.meta.glob('./*.webp', { eager: true })

const userAvatars: Record<string, any> = {}

Object.keys(webps).forEach(k => {
  const key = k.replace('./', '').replace('.webp', '')
  userAvatars[key] = (webps as any)[k].default
})

export default userAvatars
