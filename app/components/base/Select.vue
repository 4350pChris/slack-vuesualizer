<script lang="ts" setup>
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/vue'
import ChevronDownIcon from '~icons/mdi/chevron-down'
import { RecycleScroller } from 'vue-virtual-scroller';

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
  <Listbox v-slot="{ open }" v-model="model" as="div" class="relative text-sm min-w-[10rem] max-w-[12rem] w-full">
    <ListboxButton
      class="flex w-full justify-between items-center px-4 py-1 ring-1 ring-black/10 dark:ring-slate-300/25 hover:bg-base-200/50 dark:hover:bg-slate-200/10 transition rounded-box">
      <span class="truncate">
        <slot name="activator" />
      </span>
      <ChevronDownIcon class="w-6 h-6 transition" aria-hidden="true" :class="{ 'rotate-180': open }" />
    </ListboxButton>
    <Transition name="slide-y">
      <ListboxOptions
        class="absolute z-10 mt-1 w-full rounded-box bg-base-100 text-base-content p-2 shadow-lg">
        <RecycleScroller class="h-full max-h-60" :buffer="60" :items="items" :item-size="36" :key-field="keyProp" v-slot="{ item }">
          <ListboxOption :value="item"
            class="rounded-box bg-base-100 ui-active:bg-base-200/50 ui-active:text-base-content dark:ui-active:bg-slate-200/10 ui-selected:bg-primary ui-selected:text-primary-content text-base-content transition px-4 py-2 select-none cursor-pointer relative">
            <span class="truncate block">
              <slot name="item" :item="item" />
            </span>
          </ListboxOption>
        </RecycleScroller>
      </ListboxOptions>
    </Transition>
  </Listbox>
</template>
