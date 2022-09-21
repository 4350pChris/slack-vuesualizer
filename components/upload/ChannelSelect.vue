<template>
  <ul class="list-none w-max">
    <li v-for="channel in channels" :key="channel" class="form-control">
      <label class="label cursor-pointer">
        <input
          type="checkbox"
          class="checkbox mr-4"
          :value="channel"
          v-model="model"
        />
        <span class="label-text">{{ channel }}</span>
      </label>
    </li>
  </ul>
</template>

<script lang="ts" setup>
interface Props {
  channels: string[];
  modelValue: string[];
}

interface Emits {
  (event: "update:modelValue", payload: string[]): void;
}

const props = defineProps<Props>();

const emit = defineEmits<Emits>();

const model = useVModel(props, "modelValue", emit);
</script>
