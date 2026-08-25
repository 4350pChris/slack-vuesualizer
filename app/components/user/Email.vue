<script lang="ts" setup>
import EmailIcon from '~icons/mdi/email'

type Props = {
  email: string
}

defineProps<Props>()
</script>

<template>
  <div class="flex gap-2 items-center" :data-flip-id="email">
    <EmailIcon class="w-5 h-5" />
    <a class="border-b-2 border-transparent hover:border-primary transition whitespace-nowrap" :href="`mailto:${email}`">
      {{ email }}
    </a>
  </div>
</template>
