<template>
  <blockquote
    class="ml-2 pl-2 bg-base-100 dark:bg-base-300 border-l-2 border-l-slate-300/75"
  >
    <MessageBlock
      v-for="(element, i) in node.elements"
      :key="i"
      :node="element"
    />
  </blockquote>
</template>

<script lang="ts" setup>
import type { RichTextQuote } from "~/types/Message";

defineProps<{ node: RichTextQuote }>();
</script>
