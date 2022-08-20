<template>
  <div class="p-4 rounded bg-base-200">
    <ul class="list-none flex flex-col gap-4" v-if="results.length > 0">
      <li v-for="result in results" :key="result._id">
        <a :href="`/channels/${result.channel}?message=${result._id}`">
          <MessageItem :message="result" :simple="true" />
        </a>
      </li>
    </ul>
    <p v-else>No results found.</p>
  </div>
</template>

<script lang="ts" setup>
import type { Message } from "~/types/Message";

interface Props {
  results: Message[];
}

defineProps<Props>();
</script>
