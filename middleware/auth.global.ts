export default defineNuxtRouteMiddleware((to, _) => {
  const urlToken = to.query.token
  let token = $(useCookie('mongouuid'))

  if (typeof urlToken === 'string')
    token = urlToken

  if (token && to.path === '/')
    return navigateTo('/workspace')

  if (!token && to.meta.layout !== 'upload')
    return navigateTo('/upload')
})
