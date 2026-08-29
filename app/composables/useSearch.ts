import type { Message } from '~/types/Message'

export function useSearch(currentChannel: MaybeRefOrGetter<string | string[] | undefined>) {
  const searching = ref(false)
  const results = ref<Message[]>([])
  const query = ref('')
  const allChannels = ref(false)

  const search = useDebounceFn(async () => {
    const queryParams: { query: string; channel?: string | string[] } = {
      query: query.value,
    }

    const channel = toValue(currentChannel)
    if (!allChannels.value && channel)
      queryParams.channel = channel

    try {
      results.value = await $fetch<Message[]>('/api/messages/search' as never, {
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
    () => !toValue(currentChannel),
    () => {
      allChannels.value = true
    },
    { immediate: true },
  )

  return { allChannels, query, results, searching: readonly(searching), search }
}
