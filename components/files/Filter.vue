<template>
  <div class="space-y-2">
    <p class="text-sm font-bold">Filter</p>
    <div class="flex justify-start items-center gap-2">
      <UserMultiSelect v-model="selectedUsers" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { User } from "~~/types/User";

const selectedUsers = ref<User[]>([]);
</script>
