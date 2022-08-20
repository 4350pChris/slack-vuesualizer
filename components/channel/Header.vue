<template>
  <div>
    <h1 class="text-xl font-bold mb-2">{{ channel?.name }}</h1>
    <p class="font-mono text-sm leading-relaxed">
      Created on {{ created.toLocaleDateString() }} by {{ creator?.real_name }}
    </p>
    <p class="italic" v-if="channel?.purpose?.value">
      {{ channel.purpose.value }}
    </p>
  </div>
</template>

<script lang="ts" setup>
import type { Channel } from "~/types/Channel";

interface Props {
  channel: Channel | null;
}

const users = useUsers();

const props = defineProps<Props>();

const created = computed(() => new Date(props.channel?.created * 1000));
const creator = computed(() =>
  users.value.find((u) => u.id === props.channel?.creator)
);
</script>
