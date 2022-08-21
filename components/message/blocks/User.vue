<template>
  <span class="font-medium text-info">@{{ user?.name }}</span>
</template>

<script lang="ts" setup>
import type { UserLeaf } from "~~/types/Message";

const props = defineProps<{ node: UserLeaf }>();

const users = useUsers();

const user = computed(() =>
  users.value.find((u) => u.id === props.node.user_id)
);
</script>
