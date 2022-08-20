<template>
  <div class="stat">
    <div class="stat-title">Messages</div>
    <div class="stat-value">{{ count }}</div>
  </div>
</template>

<script lang="ts" setup>
const { data: count } = await useFetch("/api/messages/count");
</script>
