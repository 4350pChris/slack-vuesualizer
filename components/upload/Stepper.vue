<template>
  <div class="flex flex-col items-center">
    <ul class="steps mb-4 flex-1">
      <li class="step capitalize" :class="{ 'step-info': step >= 0 }">
        {{ $t("stepper.choose") }}
      </li>
      <li class="step capitalize" :class="{ 'step-info': step >= 1 }">
        {{ $t("stepper.channels") }}
      </li>
      <li class="step capitalize" :class="{ 'step-info': step >= 2 }">
        {{ $t("upload.word") }}
      </li>
      <li
        data-content="✓"
        class="step capitalize"
        :class="{ 'step-info': step >= 3 }"
      ></li>
    </ul>
    <Transition name="slide-x" mode="out-in">
      <UploadFileForm v-if="step === 0" @uploaded="handleFileUpload" />
      <UploadChannelSelect
        v-else-if="step === 1"
        :channels="channels"
        v-model="selectedChannels"
      />
      <UploadWorker
        v-else-if="step === 2"
        :channels="selectedChannels"
        :fileName="fileName"
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
interface Emits {
  (event: "abort"): void;
}

defineEmits<Emits>();

const step = ref(0);
const fileName = ref("");
const channels = ref<string[]>([]);
const selectedChannels = ref<string[]>([]);
const token = ref("");

const handleFileUpload = (payload: {
  channels: string[];
  fileName: string;
}) => {
  channels.value = payload.channels;
  selectedChannels.value = payload.channels;
  fileName.value = payload.fileName;
};

const handleWorkerDone = (uuid: string) => {
  token.value = uuid;
  step.value++;
};
</script>
