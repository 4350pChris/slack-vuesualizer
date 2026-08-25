<script lang="ts" setup>
import type { Block } from '~/types/Message'

defineProps<{ node: Block }>()
</script>

<template>
  <MessageBlocksRichText
    v-if="node.type === 'rich_text'"
    :key="node.block_id"
    :node="node"
  />
  <MessageBlocksRichTextSection
    v-else-if="node.type === 'rich_text_section'"
    :node="node"
  />
  <MessageBlocksText v-else-if="node.type === 'text'" :node="node" />
  <MessageBlocksEmoji v-else-if="node.type === 'emoji'" :node="node" />
  <MessageBlocksLink v-else-if="node.type === 'link'" :node="node" />
  <MessageBlocksUser v-else-if="node.type === 'user'" :node="node" />
  <MessageBlocksBroadcast v-else-if="node.type === 'broadcast'" :node="node" />
  <MessageBlocksRichTextQuote
    v-else-if="node.type === 'rich_text_quote'"
    :node="node"
  />
  <MessageBlocksRichTextList
    v-else-if="node.type === 'rich_text_list'"
    :node="node"
  />
  <MessageBlocksChannel v-else-if="node.type === 'channel'" :node="node" />
  <MessageBlocksRichTextPreformatted
    v-else-if="node.type === 'rich_text_preformatted'"
    :node="node"
  />
  <p v-else class="text-warning">
    {{ node }}
  </p>
</template>
