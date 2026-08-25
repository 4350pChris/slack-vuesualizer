<script lang="ts" setup>
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import type { Message } from '~/types/Message';

type MessagePage = {
  messages: Message[]
  count?: number
  minTs?: string
  maxTs?: string
  olderCursor?: string
  newerCursor?: string
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
const maxPages = 5
const pages = ref<MessagePage[]>([])
const loadingOlder = ref(false)
const loadingNewer = ref(false)
const messages = computed(() => pages.value.flatMap(page => page.messages))
const messageListKey = computed(() => `${messageQuery.value ?? dateQuery.value ?? ''}:${page.value?.messages[0]?.ts ?? ''}`)

watch(page, value => (pages.value = value ? [value] : []), { immediate: true })

const loadOlder = async () => {
  const oldestPage = pages.value[0]
  if (!oldestPage?.olderCursor || loadingOlder.value)
    return

  loadingOlder.value = true
  try {
    const olderPage = await $fetch<MessagePage>(`/api/channels/${unref(channelId)}/messages`, {
      query: { before: oldestPage.olderCursor },
    })
    pages.value.unshift(olderPage)
  }
  finally {
    loadingOlder.value = false
  }
}

const loadNewer = async () => {
  const newestPage = pages.value.at(-1)
  if (!newestPage?.newerCursor || loadingNewer.value)
    return

  loadingNewer.value = true
  try {
    const newerPage = await $fetch<MessagePage>(`/api/channels/${unref(channelId)}/messages`, {
      query: { after: newestPage.newerCursor },
    })
    pages.value.push(newerPage)
    if (pages.value.length > maxPages)
      pages.value.shift()
  }
  finally {
    loadingNewer.value = false
  }
}

const trimNewestPage = () => {
  if (pages.value.length > maxPages)
    pages.value.pop()
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
      <MessageList :messages="messages" :loading-older="loadingOlder" :loading-newer="loadingNewer"
        :reset-key="messageListKey" @load-older="loadOlder" @load-newer="loadNewer"
        @older-restored="trimNewestPage" />
    </template>
    <div v-else class="text-xl text-center">
      {{ $t('channel.empty') }}
    </div>
  </section>
</template>
