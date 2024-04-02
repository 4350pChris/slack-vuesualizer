<script lang="ts" setup>
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import type { Message } from '~/types/Message';

const route = useRoute()

const channelId = computed(() => route.params.channel as string)

const { typeById } = useChannels()

const { data: channel } = await useFetch(
  `/api/${typeById(channelId.value)}/${channelId.value}`,
  {
    headers: useRequestHeaders(['cookie']),
  },
)

const { data: messages, pending } = useLazyFetch<Message[]>(
  `/api/channels/${unref(channelId)}/messages`,
  {
    headers: useRequestHeaders(['cookie']),
  },
)

const date = ref<Date>()
const toDate = useTsToDate()
const colorMode = useColorMode()

const localeRoute = useLocaleRoute()

whenever(date, (d) => {
  const message = messages.value?.find(m => d < (toDate(m.ts) ?? 0)) ?? messages.value!.at(-1)
  if (message) {
    navigateTo(localeRoute({
      path: route.path,
      query: { ...route.query, message: message._id },
    }))
  }
})
</script>

<template>
  <section class="flex flex-col h-full w-full max-w-xl">
    <div class="my-2 md:my-4 flex flex-col gap-2">
      <ChannelHeader v-if="channel" class="flex-1" v-bind="channel" :messages="messages?.length ?? 0" />
      <Datepicker v-model="date" :dark="colorMode.value === 'business'" :placeholder="$t('jumpToDate')"
        :start-date="toDate(messages?.[0]?.ts)" :min-date="toDate(messages?.[0]?.ts)"
        :max-date="toDate(messages?.at(-1)?.ts)" />
    </div>
    <div v-if="pending" class="flex flex-col gap-4 overflow-y-hidden">
      <MessageSkeleton v-for="i in [1, 2, 3, 4, 5, 6, 7]" :key="i" class="shrink-0" />
    </div>
    <MessageList v-else-if="messages && messages.length" :messages="messages" />
    <div v-else class="text-xl text-center">
      {{ $t('channel.empty') }}
    </div>
  </section>
</template>
