export default defineNuxtRouteMiddleware((to, _) => {
  const urlToken = to.query.token
  const token = useCookie('mongouuid')
  const localePath = useLocalePath()

  if (typeof urlToken === 'string')
    token.value = urlToken

  if (token.value && to.path === localePath('/'))
    return navigateTo(`/workspace?token=${token.value}`)

  if (!token.value && to.meta.layout !== 'upload')
    return navigateTo('/upload')
})
