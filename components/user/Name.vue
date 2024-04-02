<script lang="ts" setup>
import type { User } from '~~/types/User';

type Props = {
  user: User
}

defineProps<Props>()
</script>

<template>
  <slot :username="useUserName(user)" :data-flip-id="user.id + '-username'" />
</template>
