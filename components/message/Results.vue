<template>
  <ul class="list-none" v-if="results.length > 0">
    <li v-for="result in results" :key="result._id">
      <a :href="`/channels/${result.channel}`">
        <MessageItem :message="result" />
      </a>
    </li>
  </ul>
  <p v-else>No results found.</p>
</template>

<script lang="ts" setup>
import type { Message } from "~/types/Message";

interface Props {
  results: Message[];
}

defineProps<Props>();
</script>
