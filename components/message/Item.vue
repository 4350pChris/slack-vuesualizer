<template>
  <div class="flex flex-nowrap gap-2">
    <UserAvatar
      v-if="message.user_profile"
      :src="message.user_profile.image_72"
    />
    <div class="flex flex-col">
      <div>
        <span class="font-bold">{{ message.user_profile?.display_name }}</span>
        <span class="font-light">{{ toTs(message.ts).toLocaleString() }}</span>
      </div>
      <p>{{ message.text }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Message } from "~/types/Message";

interface Props {
  message: Message;
}

defineProps<Props>();

const toTs = useTsToDate();
</script>
