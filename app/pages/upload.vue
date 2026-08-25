<script lang="ts" setup>
definePageMeta({
  layout: 'upload',
})

const localeRoute = useLocaleRoute()
const path = localeRoute({ name: 'index' })
</script>

<template>
  <div class="w-full max-w-xl">
    <UploadStepper @abort="navigateTo(path)" />
  </div>
</template>
