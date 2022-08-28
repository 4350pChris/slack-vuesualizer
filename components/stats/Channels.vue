<template>
  <div class="stat">
    <div class="stat-title">{{ $t("channel.word", 2) }}</div>
    <div class="stat-value">{{ data.length }}</div>
  </div>
</template>

<script lang="ts" setup>
const { data } = await useFetch("/api/channels");
</script>
