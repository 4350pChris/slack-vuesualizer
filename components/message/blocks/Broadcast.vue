<script lang="ts" setup>
import type { BroadcastLeaf } from '~~/types/Message'

defineProps<{ node: BroadcastLeaf }>()
</script>

<template>
  <span class="font-medium text-info">@{{ node.range }}</span>
</template>
