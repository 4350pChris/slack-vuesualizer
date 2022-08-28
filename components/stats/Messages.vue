<template>
  <div class="stat">
    <div class="stat-title">{{ $t("message", 2) }}</div>
    <div class="stat-value">{{ count }}</div>
  </div>
</template>

<script lang="ts" setup>
const { data: count } = await useFetch("/api/messages/count");
</script>
