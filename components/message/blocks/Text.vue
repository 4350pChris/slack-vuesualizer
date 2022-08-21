<template>
  <span v-text="node.text" :class="{ 'font-bold': node.style?.bold }"></span>
</template>

<script lang="ts" setup>
import type { TextLeaf } from "~~/types/Message";

defineProps<{ node: TextLeaf }>();
</script>
