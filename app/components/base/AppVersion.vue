<script lang="ts" setup>
const { version, buildDate } = useRuntimeConfig().public
</script>

<template>
  <code class="text-sm">{{ version }} / {{ buildDate }}</code>
</template>
