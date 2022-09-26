<template>
  <span
    v-text="node.text"
    :class="{
      'font-bold': node.style?.bold,
      italic: node.style?.italic,
      'line-through': node.style?.strike,
      'px-1 font-mono bg-gray-200 dark:bg-gray-600/50 text-red-600':
        node.style?.code,
    }"
  ></span>
</template>

<script lang="ts" setup>
import type { TextLeaf } from "~~/types/Message";

defineProps<{ node: TextLeaf }>();
</script>
