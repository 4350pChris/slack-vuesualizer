<template>
  <ChannelHeader :channel="channel" />
  <MessageList :messages="messages" />
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
  }
);
</script>
