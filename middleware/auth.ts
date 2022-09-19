export default defineNuxtRouteMiddleware((to, from) => {
  const token = useCookie("mongouuid");
  if (!token) {
    return navigateTo("/upload");
  }
});
