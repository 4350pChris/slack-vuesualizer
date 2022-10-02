<script lang="ts" setup>
import { Sortable } from '~~/types/Sort'

interface Props {
  modelValue: string
}

interface Emits {
  (event: 'update:modelValue', payload: string): void
}

const props = defineProps<Props>()

const emit = defineEmits<Emits>()

const sortables = [
  Sortable.AtoZ,
  Sortable.ZtoA,
  Sortable.Newest,
  Sortable.Oldest,
]

const model = useVModel(props, 'modelValue', emit)
</script>

<template>
  <BaseSelect v-model="model" :items="sortables">
    <template #activator>
      {{ model }}
    </template>
    <template #item="{ item }">
      {{ item }}
    </template>
  </BaseSelect>
</template>
