<template>
  <label class="hero h-full bg-base-200" for="upload">
    <div class="hero-content text-center flex-col">
      <CloudUpload class="h-40 w-40" />
      <div class="text-lg font-bold font-mono">upload export (.zip)</div>
      <input
        type="file"
        class="hidden"
        id="upload"
        accept="application/zip"
        @change="file = ($event.target as unknown as { 'files': FileList }).files[0]"
      />
    </div>
  </label>
</template>

<script lang="ts" setup>
import CloudUpload from "~icons/mdi/cloud-upload-outline";

definePageMeta({
  layout: "upload",
});

const file = ref<File>();

watch(file, async (f) => {
  const fd = new FormData();
  fd.append("file", f);
  await $fetch("/api/import", {
    method: "POST",
    body: fd,
  });

  navigateTo("/");
});
</script>
