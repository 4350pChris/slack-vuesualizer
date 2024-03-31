<script lang="ts" setup>
const route = useRoute()

const channelId = computed(() => route.params.channel as string)

const { typeById } = useChannels()

const { data: channel } = await useFetch(
  `/api/${typeById(channelId.value)}/${channelId.value}`,
  {
    headers: useRequestHeaders(['cookie']),
  },
)
</script>

<template>
  <ChannelMessageDisplay :header="channel" :channelId="channelId" />
</template>
