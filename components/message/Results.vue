<template>
  <div>
    <ul class="list-none flex flex-col gap-4 p-1" v-if="results.length > 0">
      <li v-for="result in results" :key="result._id">
        <a :href="`/channels/${result.channel}?message=${result._id}`">
          <MessageItem
            class="transition rounded hover:bg-base-200/50 dark:hover:bg-slate-200/10"
            :message="result"
            :simple="true"
          />
        </a>
      </li>
    </ul>
    <p class="font-medium" v-else>No results found.</p>
  </div>
</template>

<script lang="ts" setup>
import type { Message } from "~/types/Message";

interface Props {
  results: Message[];
}

defineProps<Props>();
</script>
