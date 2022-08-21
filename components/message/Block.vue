<template>
  <LazyMessageBlocksRichText
    v-if="node.type === 'rich_text'"
    :key="node.block_id"
    :node="node"
  />
  <LazyMessageBlocksRichTextSection
    v-else-if="node.type === 'rich_text_section'"
    :node="node"
  />
  <LazyMessageBlocksText v-else-if="node.type === 'text'" :node="node" />
  <LazyMessageBlocksEmoji v-else-if="node.type === 'emoji'" :node="node" />
  <LazyMessageBlocksLink v-else-if="node.type === 'link'" :node="node" />
  <LazyMessageBlocksUser v-else-if="node.type === 'user'" :node="node" />
  <LazyMessageBlocksBroadcast
    v-else-if="node.type === 'broadcast'"
    :node="node"
  />
  <LazyMessageBlocksRichTextQuote
    v-else-if="node.type === 'rich_text_quote'"
    :node="node"
  />
  <LazyMessageBlocksRichTextList
    v-else-if="node.type === 'rich_text_list'"
    :node="node"
  />
  <LazyMessageBlocksChannel v-else-if="node.type === 'channel'" :node="node" />
  <p v-else class="text-warning">{{ node }}</p>
</template>

<script lang="ts" setup>
import type { Block } from "~/types/Message";

defineProps<{ node: Block }>();
</script>
