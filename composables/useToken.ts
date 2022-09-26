export const useToken = () => useCookie("mongouuid");

export const useShareLink = () => {
  const token = useToken();

  return computed(() => window.location.host + "?token=" + token.value);
};
