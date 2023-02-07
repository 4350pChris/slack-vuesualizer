<script lang="ts" setup>
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import type { Channel } from '~/types/Channel'
import type { Message } from '~/types/Message'

const route = useRoute()

const { data: channel } = $(await useFetch<Channel>(
  `/api/channels/${route.params.channel}`,
  {
    pick: ['name', 'purpose', 'creator', 'created'],
    headers: useRequestHeaders(['cookie']),
    initialCache: false,
  },
))

const { data: messages, pending } = $(await useLazyFetch<Message[]>(
  `/api/channels/${route.params.channel}/messages`,
  {
    headers: useRequestHeaders(['cookie']),
    initialCache: false,
  },
))

const toDate = useTsToDate()

const _MS_PER_DAY = 1000 * 60 * 60 * 24

function dateDiffInDays(a: Date, b: Date) {
  // Discard the time and time-zone information.
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate())
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate())

  return Math.floor((utc2 - utc1) / _MS_PER_DAY)
}

const withSeparators = $computed(() =>
  messages?.reduce(
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

const date = ref<Date>()

whenever(date, (d) => {
  const message = messages?.find(m => d < toDate(m.ts)) ?? messages!.at(-1)
  if (message) {
    navigateTo({
      path: route.path,
      query: { ...route.query, message: message._id },
    })
  }
})
</script>

<template>
  <section class="flex flex-col h-full w-full max-w-xl">
    <div class="my-2 md:my-4 flex flex-col gap-2">
      <ChannelHeader
        class="flex-1"
        :channel="channel"
        :messages="messages?.length"
      />
      <Datepicker
        v-model="date"
        :placeholder="$t('jumpToDate')"
        :start-date="toDate(messages?.[0]?.ts)"
        :min-date="toDate(messages?.[0]?.ts)"
        :max-date="toDate(messages?.at(-1)?.ts)"
      />
    </div>
    <div v-if="pending" class="flex flex-col gap-4 overflow-y-hidden">
      <MessageSkeleton
        v-for="i in [1, 2, 3, 4, 5, 6, 7]"
        :key="i"
        class="shrink-0"
      />
    </div>
    <MessageList v-else :messages="withSeparators.messages" />
  </section>
</template>
