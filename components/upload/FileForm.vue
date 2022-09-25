<template>
  <div class="text-center">
    <div class="form-control" ref="dropZoneRef">
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
        ref="fileInputRef"
        @change="handleUpload([...fileInputRef.files])"
      />
    </div>
    <p v-if="invalid" class="text-error">{{ $t("stepper.wrongfile") }}</p>
    <code v-else-if="model" class="my-2">{{ model.name }}</code>
  </div>
</template>

<script lang="ts" setup>
import CloudUpload from "~icons/mdi/cloud-upload-outline";

interface Emits {
  (
    event: "update:modelValue",
    payload: { channels: string[]; fileName: string }
  ): void;
}

interface Props {
  modelValue: File;
  invalid: boolean;
}

const emit = defineEmits<Emits>();

const props = defineProps<Props>();

const model = useVModel(props, "modelValue", emit);

const dropZoneRef = ref<HTMLDivElement>();
const fileInputRef = ref<HTMLInputElement>();

const handleUpload = (files: File[] | null) => {
  model.value = files[0];
};

useDropZone(dropZoneRef, handleUpload);
</script>
