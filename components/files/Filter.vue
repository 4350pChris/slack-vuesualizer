<template>
  <div class="space-y-2">
    <p class="text-sm font-bold">Filter</p>
    <div class="flex justify-start items-center gap-2">
      <UserMultiSelect v-model="users" />
      <ChannelMultiSelect v-model="channels" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Channel } from "~~/types/Channel";
import type { User } from "~~/types/User";

interface Props {
  channels: Channel[];
  users: User[];
}

interface Emits {
  (event: "update:channels", payload: Channel[]): void;
  (event: "update:users", payload: User[]): void;
}

const props = defineProps<Props>();

const emit = defineEmits<Emits>();

const { channels, users } = useVModels(props, emit);
</script>
