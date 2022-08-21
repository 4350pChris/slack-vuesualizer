<template>
  <div class="whitespace-pre-wrap" :id="node.block_id">
    <MessageBlock
      v-for="(section, i) in node.elements"
      :key="i"
      :node="section"
    />
  </div>
</template>

<script lang="ts" setup>
import type { RichText } from "~/types/Message";

defineProps<{ node: RichText }>();
</script>
