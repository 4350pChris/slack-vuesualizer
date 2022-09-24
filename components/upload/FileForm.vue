<template>
  <div>
    <div class="form-control text-center">
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
    <code v-if="model" class="my-2">{{ model.name }}</code>
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
}

const emit = defineEmits<Emits>();

const props = defineProps<Props>();

const model = useVModel(props, "modelValue", emit);

const handleUpload = (event: Event) => {
  model.value = (event.target as unknown as { files: FileList }).files[0];
};
</script>
