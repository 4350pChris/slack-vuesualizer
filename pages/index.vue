<template>
  <div class="flex flex-col max-w-md text-center">
    <h1 class="flex flex-col justify-center items-center gap-2 mb-4">
      <SlackIcon class="w-32 h-32" />
      <span class="font-medium text-5xl">Vuesualizer</span>
    </h1>
    <p class="whitespace-pre-wrap text-lg my-4">{{ $t("description") }}</p>
    <UploadTokenForm />
    <div class="divider uppercase">{{ $t("or") }}</div>
    <NuxtLink class="btn btn-outline gap-2" to="/upload">
      <UploadIcon class="w-6 h-6" />
      {{ $t("upload.button") }}
    </NuxtLink>
  </div>
</template>

<script lang="ts" setup>
import SlackIcon from "~icons/logos/slack-icon";
import UploadIcon from "~icons/mdi/upload";

definePageMeta({
  layout: "upload",
});
</script>
