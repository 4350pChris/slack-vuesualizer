<script lang="ts" setup>
import RobotIcon from '~icons/mdi/robot-outline'
import type { User } from '~/types/User'

interface Props {
  user: User
}

defineProps<Props>()
</script>

<template>
  <div class="flex flex-col grow" :data-flip-id="user.id">
    <div class="mb-2 md:mb-4">
      <UserName :user #default="{ username, dataFlipId }">
        <h1 class="font-medium" :data-flip-id="dataFlipId">{{ username }}</h1>
      </UserName>
      <div>
        <RobotIcon v-if="user.is_bot" class="w-8 h-8 text-base-content/75" />
      </div>
    </div>
    <UserEmail v-if="user.profile.email" :email="user.profile.email" />
    <UserPhone v-if="user.profile.phone" :phone="user.profile.phone" />
  </div>
</template>
