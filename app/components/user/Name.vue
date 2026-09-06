<script lang="ts" setup>
import type { User } from '~/types/User';

type Props = {
  user: User
}

defineProps<Props>()
</script>

<template>
  <div class="flex gap-2 items-center" :data-flip-id="user.id + '-username'">
    <Icon v-if="user.is_bot" name="mdi:robot-outline" class="w-8 h-8 text-base-content/75" aria-label="bot user" />
    <slot :username="useUserName(user)" />
  </div>
</template>
