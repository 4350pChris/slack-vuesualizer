<template>
  <span v-html="decoded" :title="node.name"></span>
</template>

<script lang="ts" setup>
import type { EmojiLeaf } from "~/types/Message";

const props = defineProps<{ node: EmojiLeaf }>();

const decoded = computed(() => {
  const hexPart = props.node.unicode?.split("-")[0];
  if (!hexPart) {
    return props.node.name;
  } else {
    return `&#x${hexPart}`;
  }
});
</script>
