<template>
  <div class="avatar">
    <div v-bind="$attrs">
      <img v-if="src" :src="src" decoding="async" class="w-full h-full" />
      <PlaceholderIcon v-else class="w-full h-full bg-base-100" />
    </div>
  </div>
</template>

<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<script lang="ts" setup>
import PlaceholderIcon from "~icons/mdi/account-question-outline";

interface Props {
  src: string;
}

defineProps<Props>();
</script>
