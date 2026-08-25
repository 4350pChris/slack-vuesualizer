<script lang="ts" setup>
import type { RichTextSection } from '~~/types/Message'

defineProps<{ node: RichTextSection }>()
</script>

<template>
  <span>
    <MessageBlock
      v-for="(element, i) in node.elements"
      :key="i"
      :node="element"
    />
  </span>
</template>
