<template>
  <div>
    <ul class="list-none flex flex-col gap-4 p-1" v-if="results.length > 0">
      <li v-for="result in results" :key="result._id">
        <NuxtLink
          :to="`/channels/${result.channel}?message=${result._id}`"
          @click="$emit('close')"
        >
          <span class="font-bold">In Channel {{ result.channel }}</span>
          <MessageItem
            class="transition rounded hover:bg-base-200/50 dark:hover:bg-slate-200/10"
            :disableReplyBar="true"
            :message="result"
            :simple="true"
          />
        </NuxtLink>
      </li>
    </ul>
    <p class="capitalize font-medium" v-else>{{ $t("noresults") }}</p>
  </div>
</template>

<script lang="ts" setup>
import type { Message } from "~/types/Message";

interface Props {
  results: Message[];
}

interface Emits {
  (event: "close"): void;
}

defineProps<Props>();

defineEmits<Emits>();
</script>
