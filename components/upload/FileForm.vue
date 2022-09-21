<template>
  <div>
    <template v-if="uploading">
      <LoadingSpinner class="h-20 w-20 mx-auto my-2" />
      <p>{{ $t("upload.inProgress") }}</p>
    </template>
    <div class="form-control" v-else>
      <label for="file" class="cursor-pointer">
        <CloudUpload class="-mt-4 h-40 w-40 mx-auto" />
        <span class="text-lg font-bold font-mono">
          {{ $t("upload.button") }}
        </span>
      </label>
      <input
        type="file"
        class="hidden"
        id="file"
        name="file"
        accept="application/zip"
        @change="handleUpload"
      />
    </div>
    <code v-if="file" class="my-2">{{ file.name }}</code>
  </div>
</template>

<script lang="ts" setup>
import LoadingSpinner from "~icons/line-md/loading-alt-loop";
import CloudUpload from "~icons/mdi/cloud-upload-outline";

interface Emits {
  (event: "uploaded", payload: { channels: string[]; fileName: string }): void;
}

const emit = defineEmits<Emits>();

const uploading = ref(false);
const file = ref<File>();

const handleUpload = (event: Event) => {
  file.value = (event.target as unknown as { files: FileList }).files[0];
};

watch(file, async (f) => {
  uploading.value = true;
  try {
    const presignedUrl = await $fetch(`/api/import/${f.name}/presign`);
    await $fetch(presignedUrl, {
      method: "PUT",
      body: f,
    });
    const { channels } = await $fetch(`/api/import/${f.name}/read`);
    emit("uploaded", { channels, fileName: f.name });
  } catch (e) {
    throw createError({ cause: e, message: "Error during file upload." });
  } finally {
    uploading.value = false;
  }
});
</script>
