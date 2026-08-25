<script lang="ts" setup>
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import type { Message } from '~/types/Message';

type MessagePage = {
  messages: Message[]
  count?: number
  minTs?: string
  maxTs?: string
  nextCursor?: string
}

const route = useRoute()

const channelId = computed(() => route.params.channel as string)

const { typeById } = useChannels()

const channelType = computed(() => typeById(channelId.value))

const { data: channel } = await useFetch(
  `/api/${channelType.value}/${channelId.value}`,
  {
    headers: useRequestHeaders(['cookie']),
  },
)

const messageQuery = computed(() => route.query.message?.toString())
const dateQuery = computed(() => route.query.at?.toString())

const { data: page, pending } = useLazyFetch<MessagePage>(
  `/api/channels/${unref(channelId)}/messages`,
  {
    headers: useRequestHeaders(['cookie']),
    query: computed(() => ({ around: messageQuery.value, at: dateQuery.value })),
    watch: [messageQuery, dateQuery],
  },
)
const olderMessages = ref<Message[]>([])
const loadingOlder = ref(false)
const messages = computed(() => [...olderMessages.value, ...(page.value?.messages ?? [])])

watch([messageQuery, dateQuery], () => (olderMessages.value = []))

const loadOlder = async () => {
  if (!page.value?.nextCursor || loadingOlder.value)
    return

  loadingOlder.value = true
  try {
    const olderPage = await $fetch<MessagePage>(`/api/channels/${unref(channelId)}/messages`, {
      query: { before: page.value.nextCursor },
    })
    olderMessages.value.unshift(...olderPage.messages)
    page.value.nextCursor = olderPage.nextCursor
  }
  finally {
    loadingOlder.value = false
  }
}

const { withUsernames } = useWithUsernames()

const name = computed(() => {
  if (!channel.value) {
    return ""
  }

  switch (channelType.value) {
    case 'channels':
    case 'groups':
      return channel.value.name
    case 'mpims':
    case 'dms':
      return withUsernames(channel.value.members).memberString
  }
})
const date = ref<Date>()
const toDate = useTsToDate()
const colorMode = useColorMode()

const localeRoute = useLocaleRoute()

whenever(date, (d) => {
  navigateTo(localeRoute({
    path: route.path,
    query: { ...route.query, message: undefined, at: `${d.getTime() / 1000}` },
  }))
})
</script>

<template>
  <section class="flex flex-col h-full w-full max-w-xl">
    <div class="my-2 md:my-4 flex flex-col gap-2">
      <ChannelHeader v-if="channel" class="flex-1" v-bind="channel" :name :messages="page?.count ?? messages.length" />
      <Datepicker v-model="date" :dark="colorMode.value === 'business'" :placeholder="$t('jumpToDate')"
        :start-date="toDate(page?.minTs)" :min-date="toDate(page?.minTs)"
        :max-date="toDate(page?.maxTs)" />
    </div>
    <div v-if="pending" class="flex flex-col gap-4 overflow-y-hidden">
      <MessageSkeleton v-for="i in [1, 2, 3, 4, 5, 6, 7]" :key="i" class="shrink-0" />
    </div>
    <template v-else-if="messages.length">
      <button v-if="page?.nextCursor" class="btn btn-ghost btn-sm self-center" :disabled="loadingOlder" @click="loadOlder">
        {{ loadingOlder ? 'Loading…' : 'Load older messages' }}
      </button>
      <MessageList :messages="messages" />
    </template>
    <div v-else class="text-xl text-center">
      {{ $t('channel.empty') }}
    </div>
  </section>
</template>
