import type { Message } from '~/types/Message'

export const useMessages = (messages: MaybeRefOrGetter<Message[] | null>) => {
  const toDate = useTsToDate()

  const _MS_PER_DAY = 1000 * 60 * 60 * 24

  function dateDiffInDays(a: Date, b: Date) {
    // Discard the time and time-zone information.
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate())
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate())

    return Math.floor((utc2 - utc1) / _MS_PER_DAY)
  }

  const withSeparators = computed(() => {
    const msg = toValue(messages) ?? []
    return msg.reduce(
      ({ items, date }, message) => {
        const messageDate = toDate(message.ts) ?? null
        let separator = false
        if (date === null) {
          separator = true
        }
        else if (messageDate && date) {
          const diff = dateDiffInDays(date, messageDate)
          if (diff !== 0)
            separator = true
        }
        if (messageDate && separator && !message.reply)
          items.push({ date: messageDate, _id: messageDate.getTime() })

        items.push(message)
        return {
          items,
          date: message.reply ? date : messageDate,
        }
      },
      {
        items: [] as Array<Message | { date: Date; _id: number }>,
        date: null as Date | null,
      },
    )
  })

  return {
    messages,
    withSeparators,
  }
}
