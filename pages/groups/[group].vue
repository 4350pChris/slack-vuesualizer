<script lang="ts" setup>
const route = useRoute()

const channelId = computed(() => route.params.group as string)

const { data: group } = await useFetch(
  `/api/groups/${channelId.value}`,
  {
    pick: ['name', 'purpose', 'creator', 'created'],
    headers: useRequestHeaders(['cookie']),
  },
)
</script>

<template>
  <ChannelMessageDisplay :header="group" :channelId="channelId" />
</template>
