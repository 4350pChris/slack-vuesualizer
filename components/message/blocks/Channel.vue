<script lang="ts" setup>
import type { ChannelLeaf } from '~/types/Message'

const props = defineProps<{ node: ChannelLeaf }>()

const channels = useChannels()

const channel = computed(() =>
  channels.value.find(c => c.id === props.node.channel_id),
)
</script>

<template>
  <NuxtLink class="text-info" :to="`/channels/${channel?.name}`">
    {{ channel?.name }}
  </NuxtLink>
</template>
