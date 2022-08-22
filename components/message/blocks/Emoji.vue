<template>
  <span v-html="emojiUnicode" :title="node.name"></span>
</template>

<script lang="ts" setup>
import type { EmojiLeaf } from "~/types/Message";

const props = defineProps<{ node: EmojiLeaf }>();

const name = computed(() => props.node.name);

const { emojiUnicode } = useEmoji(name);
</script>
