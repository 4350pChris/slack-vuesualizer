<script lang="ts" setup>
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/vue'

interface Props {
  modelValue: any
  items: any[]
  keyProp?: string | number | symbol
}

interface Emits {
  (event: 'update:modelValue', payload: any): void
}

const props = defineProps<Props>()

const emit = defineEmits<Emits>()

const model = useVModel(props, 'modelValue', emit)
</script>

<template>
  <Listbox
    v-slot="{ open }"
    v-model="model"
    as="div"
    class="relative text-sm min-w-[10rem] max-w-[12rem] w-full"
  >
    <ListboxButton
      class="flex w-full justify-between items-center px-4 py-1 ring-1 ring-black/10 dark:ring-slate-300/25 hover:bg-base-200/50 dark:hover:bg-slate-200/10 transition rounded-box"
    >
      <span class="truncate">
        <slot name="activator" />
      </span>
      <span
        class="w-6 h-6 i-mdi:chevron-down transition"
        aria-hidden="true"
        :class="{ 'rotate-180': open }"
      />
    </ListboxButton>
    <Transition name="slide-y">
      <ListboxOptions
        class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-box bg-base-100 text-base-content p-2 shadow-lg"
      >
        <ListboxOption
          v-for="(item, i) in items"
          :key="keyProp ? item[keyProp] : i"
          v-slot="{ selected }"
          :value="item"
          class="rounded-box bg-base-100 text-base-content transition pl-10 pr-4 py-2 select-none cursor-pointer relative"
        >
          <span
            v-if="selected"
            class="flex absolute inset-y-0 left-3 items-center"
          >
            <span class="w-6 h-6 i-mdi:confirm" />
          </span>
          <span class="truncate block">
            <slot name="item" :item="item" />
          </span>
        </ListboxOption>
      </ListboxOptions>
    </Transition>
  </Listbox>
</template>
