<template>
  <div class="hero">
    <div class="hero-content text-center flex-col lg:flex-row-reverse">
      <h1 class="flex flex-col justify-center items-center gap-2 lg:ml-4">
        <SlackIcon class="w-32 h-32" />
        <span class="font-medium text-5xl">Vuesualizer</span>
      </h1>
      <div class="card flex-shrink-0 w-full max-w-sm md:shadow-xl bg-base-100">
        <div class="card-body">
          <template v-if="uploading">
            <LoadingSpinner class="h-20 w-20" />
            <p>{{ $t("upload.inProgress") }}</p>
          </template>
          <template v-else-if="dbToken">
            <i18n-t keypath="upload.done" tag="p">
              <code class="block text-lg">{{ dbToken }}</code>
            </i18n-t>
          </template>
          <template v-else>
            <UploadTokenForm />
            <div class="divider uppercase">{{ $t("or") }}</div>
            <div class="form-control">
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
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import CloudUpload from "~icons/mdi/cloud-upload-outline";
import LoadingSpinner from "~icons/line-md/loading-alt-loop";
import SlackIcon from "~icons/logos/slack-icon";

definePageMeta({
  layout: "upload",
});

const uploading = ref(false);

const file = ref<File>();
const dbToken = ref<string>();

const handleUpload = (event: Event) => {
  file.value = (event.target as unknown as { files: FileList }).files[0];
};

watch(file, async (f) => {
  uploading.value = true;
  try {
    const fd = new FormData();
    fd.append("file", f);
    const { uuid } = await $fetch("/api/import", {
      method: "POST",
      body: fd,
    });
    dbToken.value = uuid;
  } catch (e) {
    throw createError({ cause: e, message: "Error during file upload." });
  } finally {
    uploading.value = false;
  }
});
</script>
