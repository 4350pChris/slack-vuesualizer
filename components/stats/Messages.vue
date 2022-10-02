<script lang="ts" setup>
const { data: count } = await useFetch('/api/messages/count', {
  headers: useRequestHeaders(['cookie']),
})
</script>

<template>
  <StatsBase>
    <template #content>
      {{ $t("message", 2) }}
    </template>
    <template #title>
      {{ count }}
    </template>
  </StatsBase>
</template>
