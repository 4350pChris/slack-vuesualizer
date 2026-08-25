<script lang="ts" setup>
import type { Message } from '~/types/Message'

interface Props {
  replyCount: Message['reply_count']
  users: Message['reply_users']
}

defineProps<Props>()

const localUsers = useUsers()

const getUser = (id: string) =>
  localUsers.value.find(user => user.id === id)
</script>

<template>
  <div class="flex items-center gap-4 text-left divider !h-10 !m-0">
    <span v-if="replyCount" class="font-bold">{{ $t("reply", replyCount) }} ({{ replyCount }})</span>
    <div class="flex-shrink-0 avatar-group -space-x-4">
      <UserAvatar
        v-for="user in users?.slice(0, 3)"
        :key="user"
        class="w-8"
        :user="getUser(user)"
      />
      <div v-if="users && users.length > 3" class="avatar placeholder">
        <div class="w-8 bg-neutral text-neutral-content">
          <span>+ {{ users.length - 3 }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
