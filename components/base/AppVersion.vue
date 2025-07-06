<script lang="ts" setup>
const { version, buildDate } = useAppConfig()
</script>

<template>
  <code class="text-sm">{{ version }} / {{ buildDate }}</code>
</template>
