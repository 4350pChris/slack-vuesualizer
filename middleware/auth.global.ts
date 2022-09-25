export default defineNuxtRouteMiddleware((to, from) => {
  const token = useCookie("mongouuid");
  if (!token.value && to.meta.layout !== "upload") {
    return navigateTo("/upload");
  }
});
