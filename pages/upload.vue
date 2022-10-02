<script lang="ts" setup>
definePageMeta({
  layout: 'upload',
})
</script>

<template>
  <div class="w-full max-w-xl">
    <UploadStepper @abort="navigateTo('/')" />
  </div>
</template>
