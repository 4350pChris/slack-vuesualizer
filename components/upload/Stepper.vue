<script lang="ts" setup>
import type { Entry } from '@zip.js/zip.js'

interface Emits {
  (event: 'abort'): void
}

defineEmits<Emits>()

const step = ref(0)
const file = ref<File>()
const fileInvalid = ref(false)
const workerDone = ref(false)

const entries = ref<Entry[]>([])

const channels = computed(() =>
  entries.value
    .filter(entry => entry.directory)
    .map(dir => dir.filename.slice(0, -1))
    .sort(),
)

const selectedChannels = ref<string[]>([])

const { readZip } = useZip()

watch(channels, c => (selectedChannels.value = c))

watch(file, async () => {
  fileInvalid.value = false
  if (!file.value)
    return

  entries.value = await readZip(file.value)
  if (!entries.value.find(entry => entry.filename === 'users.json'))
    fileInvalid.value = true
  else
    step.value++
})

const handleWorkerDone = () => {
  workerDone.value = true
  step.value++
}

const nextDisabled = computed(() => {
  switch (step.value) {
    case 0:
      return !file.value || fileInvalid.value
    case 1:
      return selectedChannels.value.length === 0
    case 2:
      return !workerDone.value
    default:
      return false
  }
})

const { t } = useI18n()

const steps = [
  { label: t('stepper.choose'), content: "📁" },
  { label: t('stepper.channels'), content: "💬" },
  { label: t('upload.word'), content: "↑" },
  { label: t('stepper.profit'), content: "✓" },
] as const
</script>

<template>
  <div class="flex flex-col items-center">
    <ul class="steps sticky top-16 bg-base-100 w-full py-2 z-10">
      <li
        v-for="(s, i) in steps"
        :data-content="s.content"
        class="step capitalize"
        :class="step >= i ? 'step-info' : 'dark:step-neutral'"
      >
        {{ s.label }}
      </li>
    </ul>
    <Transition name="slide-x" mode="out-in">
      <UploadFileForm v-if="step === 0" v-model="file" :invalid="fileInvalid" />
      <UploadChannelSelect
        v-else-if="step === 1"
        v-model="selectedChannels"
        :channels="channels"
      />
      <UploadWorker
        v-else-if="step === 2"
        :channels="selectedChannels"
        :entries="entries"
        @done="handleWorkerDone"
      />
      <UploadSuccess v-else-if="step === 3" />
    </Transition>
  </div>
  <div
    v-if="step < 2"
    class="border-t mt-4 flex justify-between sticky bottom-0 py-4 -mb-2 bg-base-100"
  >
    <button class="btn  btn-outline" @click="$emit('abort')">
      {{ $t("abort") }}
    </button>
    <div class="flex gap-2">
      <button v-if="step > 0" class="btn btn-outline" @click="step--">
        {{ $t("back") }}
      </button>
      <button
        class="btn btn-primary"
        :disabled="nextDisabled"
        @click="step++"
      >
        {{ $t("next") }}
      </button>
    </div>
  </div>
</template>
