<template>
  <StatsBase>
    <template #content>{{ $t("channel.word", 2) }}</template>
    <template #title>{{ data.length }}</template>
  </StatsBase>
</template>

<script lang="ts" setup>
const { data } = await useFetch("/api/channels");
</script>
