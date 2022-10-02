<script lang="ts">
</script>

<script lang="ts" setup>
import PlaceholderIcon from '~icons/mdi/account-question-outline'
defineProps<Props>()

export default {
  inheritAttrs: false,
}

interface Props {
  src: string
}
</script>

<template>
  <div class="avatar">
    <div v-bind="$attrs">
      <img v-if="src" :src="src" decoding="async" class="w-full h-full">
      <PlaceholderIcon v-else class="w-full h-full bg-base-100" />
    </div>
  </div>
</template>
