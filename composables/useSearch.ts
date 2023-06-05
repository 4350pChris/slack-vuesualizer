import type { Message } from '~/types/Message'

export function useSearch(currentChannel: Ref<string | string[]>) {
  const searching = ref(false)
  const results = ref<Message[]>([])
  const query = ref('')
  const allChannels = ref(false)

  const search = useDebounceFn(async () => {
    const queryParams: { query: string; channel?: string | string[] } = {
      query: query.value,
    }

    if (!allChannels.value && currentChannel.value)
      queryParams.channel = currentChannel.value

    try {
      results.value = await $fetch('/api/messages/search', {
        query: queryParams,
        headers: useRequestHeaders(['cookie']),
      })
    }
    catch (e) {
      console.error(e)
    }
    searching.value = false
  }, 500)

  watch([query, allChannels], () => {
    if (!query.value) {
      results.value = []
      return
    }
    searching.value = true
    return search()
  })

  whenever(
    () => !currentChannel.value,
    () => {
      allChannels.value = true
    },
    { immediate: true },
  )

  return { allChannels, query, results, searching: readonly(searching), search }
}
