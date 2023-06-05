<script lang="ts" setup>
interface Props {
  modelValue: number
  pages: number
}

interface Emits {
  (event: 'update:modelValue', payload: number): void
}

const props = defineProps<Props>()

const emit = defineEmits<Emits>()

const model = $(useVModel(props, 'modelValue', emit))

const start = $computed(() => Math.max(0, model - 1))
const end = $computed(() => Math.min(props.pages, model + 2))

const buttons = $computed(() => {
  const numbersArr = Array.from(new Array(props.pages)).map((_, i) => i)
  const activeSlice = numbersArr.slice(start, end)
  if (start > 0)
    activeSlice.unshift(0, -1)

  if (end < props.pages - 1)
    activeSlice.push(-2, props.pages - 1)
  else if (Math.abs(end - props.pages) === 1)
    activeSlice.push(props.pages - 1)

  return activeSlice
})
</script>

<template>
  <div class="join">
    <button
      v-for="i in buttons"
      :key="i"
      class="btn btn-sm join-item"
      :class="{ 'btn-active': i === model }"
      :disabled="i < 0"
      @click="model = i"
    >
      {{ i < 0 ? "..." : i + 1 }}
    </button>
  </div>
</template>
