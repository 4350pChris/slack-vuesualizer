<template>
  <section>
    <ChannelHeader class="mb-8" :channel="channel" />
    <h2 class="text-lg font-bold mb-4">Messages</h2>
    <MessageList :messages="messages" />
  </section>
</template>

<script lang="ts" setup>
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

const { data: messages } = await useFetch<Message[]>(
  `/api/channels/${route.params.channel}/messages`,
  {
    initialCache: false,
    transform: (messages) =>
      messages.map((m) => {
        const replies = m.replies?.map((reply) =>
          messages.find(
            (inner) => reply.ts === inner.ts && reply.user === inner.user
          )
        );
        return { ...m, replies };
      }),
  }
);
</script>
