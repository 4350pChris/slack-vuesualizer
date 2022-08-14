<template>
  <div class="w-full max-w-xl">
    <input
      type="text"
      placeholder="Search messages"
      class="input input-bordered w-full"
      v-model="query"
    />
    <div v-if="query" class="relative z-20">
      <MessageResults
        class="absolute top-0 inset-x-0 w-full overflow-y-auto max-h-[80vh]"
        :results="results"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Message } from "~/types/Message";

const route = useRoute();
const query = ref("");
const results = ref<Message[]>([]);

const search = useDebounceFn(async () => {
  if (!query.value) {
    results.value = [];
    return;
  }
  const params: { query: string; channel?: string | string[] } = {
    query: query.value,
  };
  if (route.params.channel) {
    params.channel = route.params.channel;
  }
  results.value = await $fetch("/api/messages/search", {
    params,
  });
}, 500);

watch(query, search);
</script>
