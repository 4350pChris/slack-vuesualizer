<template>
  <div class="flex flex-col gap-4">
    <MessageItem
      v-for="message in messages"
      :key="message._id"
      :message="message"
    />
  </div>
</template>

<script lang="ts" setup>
import type { Message } from "~~/types/Message.js";

interface Props {
  messages: Message[];
}

defineProps<Props>();
</script>
