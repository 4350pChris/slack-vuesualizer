<template>
  <section class="flex flex-col h-full w-full max-w-xl">
    <ChannelHeader class="my-2 md:my-4" :channel="channel" />
    <div v-if="pending" class="h-full w-full flex justify-center">
      <LoadingSpinner class="w-12 h-12" />
    </div>
    <MessageList v-else :messages="messages" />
  </section>
</template>

<script lang="ts" setup>
import LoadingSpinner from "~icons/line-md/loading-alt-loop";
import type { Channel } from "~/types/Channel";
import type { Message } from "~/types/Message";

const route = useRoute();

const { data: channel } = await useFetch<Channel>(
  "/api/channels/" + route.params.channel,
  {
    pick: ["name", "purpose", "creator", "created"],
    initialCache: false,
  }
);

const { data: messages, pending } = await useLazyFetch<Message[]>(
  `/api/channels/${route.params.channel}/messages`,
  {
    initialCache: false,
  }
);
</script>
