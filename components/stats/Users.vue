<script lang="ts" setup>
const users = useUsers()
</script>

<template>
  <StatsBase>
    <template #content>
      {{ $t("user.word", users.length) }}
    </template>
    <template #title>
      {{ users.length }}
    </template>
  </StatsBase>
</template>
