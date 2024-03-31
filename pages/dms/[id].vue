<script lang="ts" setup>
const route = useRoute()

const channelId = computed(() => route.params.id as string)

const { data: dm } = await useFetch(
  `/api/dms/${channelId.value}`,
  {
    pick: ['created'],
    headers: useRequestHeaders(['cookie']),
  },
)
</script>

<template>
  <ChannelMessageDisplay :header="dm" :channelId="channelId" />
</template>
