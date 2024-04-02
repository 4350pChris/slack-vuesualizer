<script lang="ts" setup>
import RobotIcon from '~icons/mdi/robot-outline'
import type { User } from '~~/types/User';

type Props = {
  user: User
}

defineProps<Props>()
</script>

<template>
  <div class="flex gap-2 items-center" :data-flip-id="user.id + '-username'">
    <RobotIcon v-if="user.is_bot" class="w-8 h-8 text-base-content/75" alt="bot" aria-label="bot user" />
    <slot :username="useUserName(user)" />
  </div>
</template>
