<script lang="ts" setup>
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

const route = useRoute()
const date = ref<Date>()
const toDate = useTsToDate()

const { channel, messages, withSeparators, pending } = await useMessages(route.params.channel as string)

whenever(date, (d) => {
  const message = messages.value?.find(m => d < toDate(m.ts)) ?? messages.value!.at(-1)
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
    <div v-if="pending" class="flex flex-col gap-4 overflow-y-hidden">
      <MessageSkeleton
        v-for="i in [1, 2, 3, 4, 5, 6, 7]"
        :key="i"
        class="shrink-0"
      />
    </div>
    <template v-else-if="withSeparators">
      <div v-if="messages && messages.length > 0" class="my-2 md:my-4 flex flex-col gap-2">
        <ChannelHeader
          v-if="channel"
          class="flex-1"
          :channel="channel"
          :messages="messages.length"
        />
        <Datepicker
          v-model="date"
          :placeholder="$t('jumpToDate')"
          :start-date="toDate(messages[0].ts)"
          :min-date="toDate(messages[0].ts)"
          :max-date="toDate(messages.at(-1)!.ts)"
        />
      </div>
      <MessageList :messages="withSeparators.messages" />
    </template>
    <div v-else class="text-xl text-center">
      {{ $t('channel.empty') }}
    </div>
  </section>
</template>
