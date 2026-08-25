<script lang="ts" setup>
import type { EmojiLeaf } from '~/types/Message'

const props = defineProps<{ node: EmojiLeaf }>()

const name = computed(() => props.node.name)

const { emojiUnicode } = useEmoji(name)
</script>

<template>
  <span :title="node.name" v-html="emojiUnicode" />
</template>
