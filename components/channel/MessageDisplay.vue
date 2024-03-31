<script lang="ts" setup>
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import type { Topic } from '~/types/Channel';

type HeaderProps = {
  created: number
  name: string
  creator?: string
  purpose?: Topic
}

type Props = {
  channelId: string
  header: HeaderProps | null
}

const props = defineProps<Props>()

const route = useRoute()
const date = ref<Date>()
const toDate = useTsToDate()
const colorMode = useColorMode()

const { messages, withSeparators, pending } = await useMessages(props.channelId)
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
    <div v-if="pending" class="flex flex-col gap-4 overflow-y-hidden">
      <MessageSkeleton v-for="i in [1, 2, 3, 4, 5, 6, 7]" :key="i" class="shrink-0" />
    </div>
    <template v-else-if="withSeparators">
      <div v-if="messages && messages.length > 0" class="my-2 md:my-4 flex flex-col gap-2">
        <ChannelHeader v-if="header" class="flex-1" v-bind="header" :messages="messages.length" />
        <Datepicker v-model="date" :dark="colorMode.value === 'business'" :placeholder="$t('jumpToDate')"
          :start-date="toDate(messages[0].ts)" :min-date="toDate(messages[0].ts)"
          :max-date="toDate(messages.at(-1)!.ts)" />
      </div>
      <MessageList :messages="withSeparators.messages" />
    </template>
    <div v-else class="text-xl text-center">
      {{ $t('channel.empty') }}
    </div>
  </section>
</template>
