<template>
  <div class="flex flex-col gap-4 mb-2">
    <div class="sticky top-0 bg-base-100 py-2">
      <FilesFilter
        v-model:users="selectedUsers"
        v-model:channels="selectedChannels"
      />
    </div>
    <ul class="list-none space-y-4">
      <li v-for="message in messages" :key="message._id">
        <FilesDetailRow :file="message.file" :channel="message.channel" />
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import type { Channel } from "~~/types/Channel";
import type { User } from "~~/types/User";

const selectedUsers = ref<User[]>([]);
const selectedChannels = ref<Channel[]>([]);

const userIds = useArrayMap(selectedUsers, ({ id }) => id);
const channelNames = useArrayMap(selectedChannels, ({ name }) => name);

const { data: messages } = useAsyncData(
  "files",
  () =>
    $fetch("/api/files", {
      method: "POST",
      body: {
        users: userIds.value,
        channels: channelNames.value,
      },
      headers: useRequestHeaders(["cookie"]),
    }),
  {
    watch: [userIds, channelNames],
  }
);
</script>
