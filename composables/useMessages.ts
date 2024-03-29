import type { MaybeRef } from '@vueuse/core'
import type { Channel } from '~/types/Channel'
import type { Message } from '~/types/Message'

export const useMessages = async (channelId: MaybeRef<string>) => {
  const { data: channel } = await useFetch<Channel>(
    `/api/channels/${unref(channelId)}`,
    {
      pick: ['name', 'purpose', 'creator', 'created'],
      headers: useRequestHeaders(['cookie']),
    },
  )

  const { data: messages, pending } = await useLazyFetch<Message[]>(
    `/api/channels/${unref(channelId)}/messages`,
    {
      headers: useRequestHeaders(['cookie']),
    },
  )

  const toDate = useTsToDate()

  const _MS_PER_DAY = 1000 * 60 * 60 * 24

  function dateDiffInDays(a: Date, b: Date) {
    // Discard the time and time-zone information.
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate())
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate())

    return Math.floor((utc2 - utc1) / _MS_PER_DAY)
  }

  const withSeparators = computed(() =>
    messages.value?.reduce(
      ({ messages, date }, message) => {
        const messageDate = toDate(message.ts)
        let separator = false
        if (date === null) {
          separator = true
        }
        else {
          const diff = dateDiffInDays(date, messageDate)
          if (diff !== 0)
            separator = true
        }
        if (separator && !message.reply)
          messages.push({ date: messageDate, _id: messageDate.getTime() })

        messages.push(message)
        return {
          messages,
          date: message.reply ? date : messageDate,
        }
      },
      {
        messages: [] as Array<Message | { date: Date; _id: number }>,
        date: null as Date | null,
      },
    ),
  )

  return {
    channel,
    messages,
    withSeparators,
    pending,
  }
}
