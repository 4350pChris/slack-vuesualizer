<template>
  <a
    class="transition text-blue-600 hover:text-blue-800 visited:text-purple-600 visited:hover:text-purple-800 dark:text-blue-300 dark:hover:text-blue-500 dark:visited:text-purple-400 dark:visited:hover:text-purple-500"
    :href="node.url"
    >{{ node.url }}</a
  >
</template>

<script lang="ts" setup>
import type { LinkLeaf } from "~/types/Message";

defineProps<{ node: LinkLeaf }>();
</script>
