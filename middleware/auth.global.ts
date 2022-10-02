export default defineNuxtRouteMiddleware((to, from) => {
  const urlToken = to.query.token
  const token = useCookie('mongouuid')

  if (typeof urlToken === 'string')
    token.value = urlToken

  if (token.value && to.path === '/')
    return navigateTo('/workspace')

  if (!token.value && to.meta.layout !== 'upload')
    return navigateTo('/upload')
})
