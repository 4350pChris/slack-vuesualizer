<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<script lang="ts" setup>
interface Props {
  src: string
}

defineProps<Props>()
</script>

<template>
  <div class="avatar">
    <div v-bind="$attrs">
      <img v-if="src" :src="src" decoding="async" class="w-full h-full">
      <span
        v-else
        class="w-full h-full i-mdi:account-question-outline bg-base-100"
      />
    </div>
  </div>
</template>
