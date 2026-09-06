<script lang="ts" setup>

type Props = {
  timezone: string
}

defineProps<Props>()
</script>

<template>
  <div class="flex gap-2 items-center">
    <Icon name="mdi:map-marker-radius" class="w-5 h-5" />
    <span>{{ timezone }}</span>
  </div>
</template>
