<template>
  <div class="w-full max-w-xl">
    <div class="w-full flex items-center gap-4">
      <input
        type="text"
        placeholder="Search messages"
        class="input input-bordered w-full"
        v-model="query"
      />
      <div class="form-control">
        <label class="label cursor-pointer">
          <span class="label-text whitespace-nowrap mr-2 md:mr-4">
            Everywhere
          </span>
          <input type="checkbox" v-model="allChannels" class="checkbox" />
        </label>
      </div>
    </div>
    <div v-if="query" class="relative z-20">
      <div
        class="absolute top-0 inset-x-0 overflow-x-hidden overflow-y-auto max-h-[80vh]"
      >
        <div
          v-if="searching"
          class="p-2 bg-base-200 w-full inline-flex justify-center"
        >
          <LoadingSpinner class="w-8 h-8" />
        </div>
        <MessageResults v-else :results="results" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import LoadingSpinner from "~icons/line-md/loading-alt-loop";
import type { Message } from "~/types/Message";

const route = useRoute();
const query = ref("");
const results = ref<Message[]>([]);
const allChannels = ref(false);
const _searching = ref(false);
const searching = refDebounced(_searching, 150);

const search = useDebounceFn(async () => {
  if (!query.value) {
    results.value = [];
    return;
  }
  const params: { query: string; channel?: string | string[] } = {
    query: query.value,
  };
  if (!allChannels.value && route.params.channel) {
    params.channel = route.params.channel;
  }
  _searching.value = true;
  try {
    results.value = await $fetch("/api/messages/search", {
      params,
    });
  } catch (e) {
    console.error(e);
  }
  _searching.value = false;
}, 500);

watch([query, allChannels], search);
</script>
