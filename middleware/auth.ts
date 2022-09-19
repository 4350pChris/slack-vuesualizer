export default defineNuxtRouteMiddleware((to, from) => {
  const token = useCookie("mongouuid");
  if (!token.value) {
    return navigateTo("/upload");
  }
});
