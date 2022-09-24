<template>
  <div class="flex flex-col items-center">
    <ul class="steps mb-4">
      <li
        data-content="📁"
        class="step capitalize"
        :class="{ 'step-info': step >= 0 }"
      >
        {{ $t("stepper.choose") }}
      </li>
      <li
        data-content="💬"
        class="step capitalize"
        :class="{ 'step-info': step >= 1 }"
      >
        {{ $t("stepper.channels") }}
      </li>
      <li
        data-content="↑"
        class="step capitalize"
        :class="{ 'step-info': step >= 2 }"
      >
        {{ $t("upload.word") }}
      </li>
      <li
        data-content="✓"
        class="step capitalize"
        :class="{ 'step-info': step >= 3 }"
      >
        {{ $t("stepper.profit") }}
      </li>
    </ul>
    <Transition name="slide-x" mode="out-in">
      <UploadFileForm v-if="step === 0" v-model="file" />
      <UploadChannelSelect
        v-else-if="step === 1"
        :channels="channels"
        v-model="selectedChannels"
      />
      <UploadWorker
        v-else-if="step === 2"
        :channels="selectedChannels"
        :entries="entries"
        @done="handleWorkerDone"
      />
      <UploadSuccess v-else-if="step === 3" :token="token" />
    </Transition>
  </div>
  <div v-if="step < 2" class="card-actions justify-between">
    <button class="btn btn-ghost" @click="$emit('abort')">
      {{ $t("abort") }}
    </button>
    <div class="flex gap-2">
      <button v-if="step > 0" class="btn btn-ghost" @click="step--">
        {{ $t("back") }}
      </button>
      <button
        class="btn btn-outline btn-primary"
        :disabled="channels.length === 0"
        @click="step++"
      >
        {{ $t("next") }}
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Entry } from "@zip.js/zip.js";

interface Emits {
  (event: "abort"): void;
}

defineEmits<Emits>();

const step = ref(0);
const file = ref<File>(null);

const entries = ref<Entry[]>([]);

const channels = computed(() =>
  entries.value
    .filter((entry) => entry.directory)
    .map((dir) => dir.filename.slice(0, -1))
    .sort()
);
const selectedChannels = ref<string[]>([]);

const token = ref("");

const { readZip } = useZip();

watch(channels, (c) => (selectedChannels.value = c));

watch(file, async () => {
  if (file.value) {
    entries.value = await readZip(file.value);
  }
});

const handleWorkerDone = (uuid: string) => {
  token.value = uuid;
  step.value++;
};
</script>
