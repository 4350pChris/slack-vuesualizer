<template>
  <section class="flex flex-col h-full w-full max-w-xl">
    <div class="my-2 md:my-4 flex flex-nowrap justify-between items-start">
      <ChannelHeader
        class="flex-1"
        :channel="channel"
        :messages="messages?.length"
      />
      <div class="relative">
        <label
          class="btn btn-circle btn-ghost"
          for="jumptodate"
          :title="$t('jumpToDate')"
        >
          <span class="sr-only">{{ $t("jumpToDate") }}</span>
          <CalendarIcon class="w-6 h-6" />
        </label>
        <input
          id="jumptodate"
          name="jumptodate"
          type="date"
          class="w-0 h-0 invisible"
          @change="jumpToDate"
        />
      </div>
    </div>
    <div v-if="pending" class="flex flex-col gap-4 overflow-y-hidden">
      <MessageSkeleton
        class="shrink-0"
        v-for="i in [1, 2, 3, 4, 5, 6, 7]"
        :key="i"
      />
    </div>
    <MessageList v-else :messages="withSeparators.messages" />
  </section>
</template>

<script lang="ts" setup>
import LoadingSpinner from "~icons/line-md/loading-alt-loop";
import CalendarIcon from "~icons/mdi/calendar-search";
import type { Channel } from "~/types/Channel";
import type { Message } from "~/types/Message";

const route = useRoute();

const { data: channel } = await useFetch<Channel>(
  "/api/channels/" + route.params.channel,
  {
    pick: ["name", "purpose", "creator", "created"],
    headers: useRequestHeaders(["cookie"]),
    initialCache: false,
  }
);

const { data: messages, pending } = await useLazyFetch<Message[]>(
  `/api/channels/${route.params.channel}/messages`,
  {
    headers: useRequestHeaders(["cookie"]),
    initialCache: false,
  }
);

const toTs = useTsToDate();

const _MS_PER_DAY = 1000 * 60 * 60 * 24;

function dateDiffInDays(a: Date, b: Date) {
  // Discard the time and time-zone information.
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}

const withSeparators = computed(() =>
  messages.value.reduce(
    ({ messages, date }, message) => {
      const messageDate = toTs(message.ts);
      let separator = false;
      if (date === null) {
        separator = true;
      } else {
        const diff = dateDiffInDays(date, messageDate);
        if (diff !== 0) {
          separator = true;
        }
      }
      if (separator && !message.reply) {
        messages.push({ date: messageDate, _id: messageDate.getTime() });
      }
      messages.push(message);
      return {
        messages,
        date: message.reply ? date : messageDate,
      };
    },
    {
      messages: [] as Array<Message | { date: Date; _id: number }>,
      date: null as Date | null,
    }
  )
);

const jumpToDate = (e: Event) => {
  const date = new Date((e.target as HTMLInputElement).value);
  const message = messages.value.find((m) => date < toTs(m.ts));
  if (message) {
    navigateTo({
      path: route.path,
      query: { ...route.query, message: message._id },
    });
  }
};
</script>
