<script lang="ts" setup>
import type { Message } from '~/types/Message'

interface Props {
  results: Message[]
}

interface Emits {
  (event: 'close'): void
}

defineProps<Props>()

defineEmits<Emits>()
</script>

<template>
  <div>
    <ul v-if="results.length > 0" class="list-none flex flex-col gap-4 p-1">
      <li v-for="result in results" :key="result._id">
        <NuxtLink
          :to="`/channels/${result.channel}?message=${result._id}`"
          @click="$emit('close')"
        >
          <span class="font-bold">In Channel {{ result.channel }}</span>
          <MessageItem
            class="transition rounded hover:bg-base-200/50 dark:hover:bg-slate-200/10"
            :disable-reply-bar="true"
            :message="result"
            :simple="true"
          />
        </NuxtLink>
      </li>
    </ul>
    <p v-else class="capitalize font-medium">
      {{ $t("noresults") }}
    </p>
  </div>
</template>
