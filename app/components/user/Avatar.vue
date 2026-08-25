<script lang="ts" setup>
import PlaceholderIcon from '~icons/mdi/account-question-outline'
import type { User } from '~~/types/User';

interface Props {
  user?: User
}
const props = defineProps<Props>()
defineOptions({
  inheritAttrs: false,
})

const srcset = computed(() => {
  if (!props.user) return ''
  const { image_1024, image_512, image_192, image_72, image_48 } = props.user.profile

  const srcWithWidth = [
    [image_1024, 1024],
    [image_512, 512],
    [image_192, 192],
    [image_72, 72],
    [image_48, 48],
  ] as const

  return srcWithWidth.filter(([src]) => Boolean(src)).map(([src, width]) => `${src} ${width}w`).join(', ')
})
</script>

<template>
  <div class="avatar" :data-flip-id="`${user?.id}-avatar`">
    <div v-bind="$attrs">
      <img v-if="user" :srcset decoding="async" class="w-full h-full">
      <PlaceholderIcon v-else class="w-full h-full bg-base-100" />
    </div>
  </div>
</template>
