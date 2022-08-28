<template>
  <a
    class="fancy-link"
    :href="node.url"
    rel="noreferrer noopener"
    target="_blank"
  >
    {{ node.url }}
  </a>
</template>

<script lang="ts" setup>
import type { LinkLeaf } from "~/types/Message";

defineProps<{ node: LinkLeaf }>();
</script>
