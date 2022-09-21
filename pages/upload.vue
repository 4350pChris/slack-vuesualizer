<template>
  <div class="hero">
    <div class="hero-content text-center flex-col lg:flex-row-reverse">
      <h1 class="flex flex-col justify-center items-center gap-2 lg:ml-4">
        <SlackIcon class="w-32 h-32" />
        <span class="font-medium text-5xl">Vuesualizer</span>
      </h1>
      <div class="card flex-shrink-0 w-full max-w-sm md:shadow-xl bg-base-100">
        <div class="card-body">
          <template v-if="token">
            <p class="text-lg font-bold">{{ $t("upload.success") }}</p>
            <i18n-t keypath="upload.done" tag="p">
              <code class="block font-medium">{{ token }}</code>
            </i18n-t>
            <NuxtLink class="btn btn-primary btn-outline" to="/">
              {{ $t("workspace.open") }}
            </NuxtLink>
          </template>
          <template v-else>
            <template v-if="!uploading">
              <UploadTokenForm />
              <div class="divider uppercase">{{ $t("or") }}</div>
            </template>
            <FileForm
              v-model:uploading="uploading"
              @uploaded="token = $event"
            />
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import SlackIcon from "~icons/logos/slack-icon";
import FileForm from "~~/components/upload/FileForm.vue";

definePageMeta({
  layout: "upload",
});

const token = ref<string>("");

const uploading = ref(false);
</script>
