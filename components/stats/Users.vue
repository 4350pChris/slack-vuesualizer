<template>
  <StatsBase>
    <template #content>{{ $t("user", 2) }}</template>
    <template #title>{{ users.length }}</template>
  </StatsBase>
</template>

<script lang="ts" setup>
const users = useUsers();
</script>
