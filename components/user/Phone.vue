<script lang="ts" setup>
import PhoneIcon from '~icons/mdi/phone'

type Props = {
  phone: string
}
defineProps<Props>()
</script>

<template>
  <div class="flex gap-2 flex-nowrap" :data-flip-id="phone">
    <PhoneIcon class="w-5 h-5" />
    <a class="font-mono text-sm" :href="`tel:${phone}`">
      {{ phone }}
    </a>
  </div>
</template>
