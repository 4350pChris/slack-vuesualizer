<script lang="ts" setup>
import type { RichText } from '~/types/Message'

defineProps<{ node: RichText }>()
</script>

<template>
  <div :id="node.block_id" class="whitespace-pre-wrap">
    <MessageBlock
      v-for="(section, i) in node.elements"
      :key="i"
      :node="section"
    />
  </div>
</template>
