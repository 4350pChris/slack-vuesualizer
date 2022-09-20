export default defineNuxtRouteMiddleware((to, from) => {
  const token = useCookie("mongouuid");
  if (!token.value && to.name !== "upload") {
    return navigateTo("/upload");
  }
});
