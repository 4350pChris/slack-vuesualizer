<template>
  <span v-html="decoded" :title="node.name"></span>
</template>

<script lang="ts" setup>
import EmojiConvertor from "emoji-js";
import type { EmojiLeaf } from "~/types/Message";

const emoji = new EmojiConvertor();
emoji.replace_mode = "unified";
const props = defineProps<{ node: EmojiLeaf }>();

const decoded = computed(() => {
  return emoji.replace_colons(`:${props.node.name}:`);
});
</script>
