<script lang="ts" setup>

type Props = {
  phone: string
}
defineProps<Props>()
</script>

<template>
  <div class="flex gap-2 flex-nowrap" :data-flip-id="phone">
    <Icon name="mdi:phone" class="w-5 h-5" />
    <a class="font-mono text-sm" :href="`tel:${phone}`">
      {{ phone }}
    </a>
  </div>
</template>
