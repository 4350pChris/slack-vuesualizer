<template>
  <div class="badge badge-ghost">
    <span v-html="emojiUnicode"></span>
    <span class="ml-1">{{ reaction.count }}</span>
  </div>
</template>

<script lang="ts" setup>
import { Reaction } from "~/types/Message";

interface Props {
  reaction: Reaction;
}

const props = defineProps<Props>();

const name = computed(() => props.reaction.name);

const { emojiUnicode } = useEmoji(name);
</script>
