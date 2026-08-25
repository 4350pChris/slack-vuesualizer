<script lang="ts" setup>
import MapMarkerIcon from '~icons/mdi/map-marker-radius'

type Props = {
  timezone: string
}

defineProps<Props>()
</script>

<template>
  <div class="flex gap-2 items-center">
    <MapMarkerIcon class="w-5 h-5" />
    <span>{{ timezone }}</span>
  </div>
</template>
