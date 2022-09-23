<template>
  <div class="card w-full max-w-xl">
    <div class="card-body">
      <UploadStepper @abort="navigateTo('/')" />
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: "upload",
});
</script>
