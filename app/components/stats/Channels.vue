<script lang="ts" setup>
const { channels } = useChannels()
</script>

<template>
  <StatsBase>
    <template #content>
      {{ $t("channel.word", channels.length) }}
    </template>
    <template #title>
      {{ channels?.length }}
    </template>
  </StatsBase>
</template>
