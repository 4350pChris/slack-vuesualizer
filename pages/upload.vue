<template>
  <div class="hero">
    <div class="hero-content text-center flex-col lg:flex-row-reverse">
      <h1
        class="flex flex-col justify-center items-center gap-2 lg:ml-4"
        v-if="!stepper"
      >
        <SlackIcon class="w-32 h-32" />
        <span class="font-medium text-5xl">Vuesualizer</span>
      </h1>
      <div class="card flex-shrink-0 w-full max-w-xl md:shadow-xl bg-base-100">
        <div class="card-body">
          <template v-if="!stepper">
            <UploadTokenForm />
            <div class="divider uppercase">{{ $t("or") }}</div>
            <button class="btn btn-outline gap-2" @click="stepper = true">
              <UploadIcon class="w-6 h-6" />
              {{ $t("upload.button") }}
            </button>
          </template>
          <LazyUploadStepper v-else @abort="stepper = false" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import SlackIcon from "~icons/logos/slack-icon";
import UploadIcon from "~icons/mdi/upload";

definePageMeta({
  layout: "upload",
});

const stepper = ref(false);
</script>
