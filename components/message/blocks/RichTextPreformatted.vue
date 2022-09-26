<template>
  <div
    class="p-2 bg-gray-200 dark:bg-gray-600/25 border border-slate-300/75 dark:border-slate-600"
  >
    <MessageBlock
      v-for="(element, i) in node.elements"
      :key="i"
      :node="element"
    />
  </div>
</template>

<script lang="ts" setup>
import type { RichTextPreformatted } from "~/types/Message";

defineProps<{ node: RichTextPreformatted }>();
</script>
