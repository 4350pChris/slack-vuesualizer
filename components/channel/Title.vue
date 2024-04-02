<script lang="ts" setup>
type Props = {
  title: string
}

defineProps<Props>()
</script>

<template>
  <div :data-flip-id="`channel-${title}-title`">
    <slot :title>
      {{ title }}
    </slot>
  </div>
</template>
