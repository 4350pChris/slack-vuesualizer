<script lang="ts" setup>
interface Props {
  channels: string[]
  modelValue: string[]
}

interface Emits {
  (event: 'update:modelValue', payload: string[]): void
}

const props = defineProps<Props>()

const emit = defineEmits<Emits>()

let model = $(useVModel(props, 'modelValue', emit))

const toggleAll = () => {
  if (model.length === props.channels.length)
    model = []
  else
    model = props.channels
}
</script>

<template>
  <ul class="list-none w-full">
    <li>
      <label class="label cursor-pointer justify-start">
        <input
          type="checkbox"
          class="checkbox mr-4"
          :checked="model.length === channels.length"
          @input="toggleAll"
        >
        <span class="label-text">{{ $t("channel.all", 2) }}</span>
      </label>
    </li>
    <li v-for="channel in channels" :key="channel" class="form-control">
      <label class="label cursor-pointer justify-start">
        <input
          v-model="model"
          type="checkbox"
          class="checkbox mr-4"
          :value="channel"
        >
        <span class="label-text">{{ channel }}</span>
      </label>
    </li>
  </ul>
</template>
