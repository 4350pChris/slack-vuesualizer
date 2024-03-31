<script lang="ts" setup>
const route = useRoute()

const channelId = computed(() => route.params.channel as string)

const { data: channel } = await useFetch(
  `/api/channels/${channelId.value}`,
  {
    pick: ['name', 'purpose', 'creator', 'created'],
    headers: useRequestHeaders(['cookie']),
  },
)
</script>

<template>
  <ChannelMessageDisplay :header="channel" :channelId="channelId" />
</template>
