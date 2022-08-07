<template>
  <label class="hero h-full" for="upload">
    <div class="hero-content text-center flex-col">
      <template v-if="uploading">
        <LoadingSpinner class="h-20 w-20" />
        <p>
          File is uploading. Do not worry, this may take a couple of seconds.
          <br />
          You will be redirected when it's finished.
        </p>
      </template>
      <template v-else>
        <CloudUpload class="h-40 w-40" />
        <div class="text-lg font-bold font-mono">
          <span>upload export (.zip)</span>
          <br />
          <span>warning: this will clear any old data that was imported</span>
        </div>
        <input
          type="file"
          class="hidden"
          id="upload"
          accept="application/zip"
          @change="file = ($event.target as unknown as { 'files': FileList }).files[0]"
        />
      </template>
    </div>
  </label>
</template>

<script lang="ts" setup>
import CloudUpload from "~icons/mdi/cloud-upload-outline";
import LoadingSpinner from "~icons/line-md/loading-alt-loop";

definePageMeta({
  layout: "upload",
});

const uploading = ref(false);

const file = ref<File>();

watch(file, async (f) => {
  uploading.value = true;
  try {
    const fd = new FormData();
    fd.append("file", f);
    await $fetch("/api/import", {
      method: "POST",
      body: fd,
    });

    await navigateTo("/");
  } catch (e) {
    throw createError({ cause: e, message: "Error during file upload." });
  } finally {
    uploading.value = false;
  }
});
</script>
