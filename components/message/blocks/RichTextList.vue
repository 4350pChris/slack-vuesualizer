<template>
  <component
    :is="node.style === 'ordered' ? 'ol' : 'ul'"
    class="list-inside flex flex-col gap-2"
    :class="{
      'list-disc': node.style === 'bullet',
      'list-decimal': node.style === 'ordered',
    }"
    :style="{ 'margin-left': `${node.indent}px;` }"
  >
    <li v-for="(block, i) in node.elements" :key="i">
      <MessageBlock :node="block" />
    </li>
  </component>
</template>

<script lang="ts" setup>
import type { RichTextList } from "~/types/Message";

defineProps<{ node: RichTextList }>();
</script>
