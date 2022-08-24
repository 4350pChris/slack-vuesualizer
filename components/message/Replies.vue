<template>
  <div class="flex items-center pl-8 pr-4 gap-4 text-left">
    <div class="avatar-group -space-x-4">
      <UserAvatar
        v-for="user in users.slice(0, 3)"
        :key="user"
        class="w-8"
        :src="getUserImage(user)"
      />
      <div v-if="users.length > 3" class="avatar placeholder">
        <div class="w-8 bg-neutral text-neutral-content">
          <span>+ {{ users.length - 3 }}</span>
        </div>
      </div>
    </div>
    <span class="font-bold">Replies ({{ replyCount }})</span>
  </div>
</template>

<script lang="ts" setup>
import type { Message } from "~/types/Message";

interface Props {
  replyCount: Message["reply_count"];
  users: Message["reply_users"];
}

defineProps<Props>();

const localUsers = useUsers();

const getUserImage = (id: string) =>
  localUsers.value.find((user) => user.id === id)?.profile.image_48;
</script>
