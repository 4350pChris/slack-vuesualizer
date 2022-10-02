<script lang="ts" setup>
import type { User } from '~/types/User'

interface Props {
  user: User
}

defineProps<Props>()
</script>

<template>
  <div class="flex justify-start gap-4 bg-base-100 text-base-content">
    <UserAvatar
      class="h-16 md:h-24 lg:h-44 w-16 md:w-24 lg:w-44 rounded-box"
      :src="user.profile.image_192"
    />
    <div class="flex flex-col grow">
      <div class="justify-between mb-2 md:mb-4">
        <p class="font-medium">
          {{ user.profile.real_name ?? user.profile.display_name }}
        </p>
        <p class="text-sm">
          {{ user.profile.display_name }}
        </p>
        <div>
          <span
            v-if="user.is_bot"
            class="w-8 h-8 i-mdi:robot-outline text-base-content/75"
          />
        </div>
      </div>
      <div class="grid grid-cols-[1.5rem_minmax(0,max-content)] gap-2">
        <template v-if="user.profile.email">
          <span class="w-5 h-5 i-mdi:email" />
          <a
            class="text-sm border-b-2 border-transparent hover:border-primary transition"
            :href="`mailto:${user.profile.email}`"
          >{{ user.profile.email }}</a>
        </template>
        <template v-if="user.profile.phone">
          <span class="w-5 h-5 i-mdi:phone" />
          <a class="font-mono text-sm" :href="`tel:${user.profile.phone}`">{{
            user.profile.phone
          }}</a>
        </template>
      </div>
    </div>
  </div>
</template>
