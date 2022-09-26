<template>
  <span
    v-text="node.text"
    :class="{
      'font-bold': node.style?.bold,
      italic: node.style?.italic,
      'line-through': node.style?.strike,
    }"
  ></span>
</template>

<script lang="ts" setup>
import type { TextLeaf } from "~~/types/Message";

defineProps<{ node: TextLeaf }>();
</script>
