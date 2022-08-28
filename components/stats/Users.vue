<template>
  <div class="stat">
    <div class="stat-title">{{ $t("user", 2) }}</div>
    <div class="stat-value">{{ users.length }}</div>
  </div>
</template>

<script lang="ts" setup>
const users = useUsers();
</script>
