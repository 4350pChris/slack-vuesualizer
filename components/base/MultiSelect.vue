<template>
  <Listbox
    v-model="model"
    multiple
    as="div"
    class="relative text-sm max-w-[12rem] w-full"
    v-slot="{ open }"
  >
    <ListboxButton
      class="flex w-full justify-between items-center px-4 py-1 ring-1 ring-black/10 dark:ring-slate-300/25 hover:bg-base-200/50 dark:hover:bg-slate-200/10 transition rounded-box"
    >
      <span class="truncate">
        <slot name="activator" />
      </span>
      <ChevronDownIcon
        class="w-6 h-6 transition"
        aria-hidden="true"
        :class="{ 'rotate-180': open }"
      />
    </ListboxButton>
    <Transition name="slide-y">
      <ListboxOptions
        class="absolute mt-1 max-h-60 w-full overflow-auto rounded-box bg-base-100 text-base-content p-2 shadow-lg"
      >
        <ListboxOption
          v-for="item in items"
          :key="item[keyProp]"
          :value="item"
          class="rounded-box bg-base-100 ui-active:bg-base-200 text-base-content transition pl-10 pr-4 py-2 select-none cursor-pointer relative"
          v-slot="{ selected }"
        >
          <span
            v-if="selected"
            class="flex absolute inset-y-0 left-3 items-center"
          >
            <ConfirmIcon class="w-6 h-6" />
          </span>
          <span class="truncate block">
            <slot name="item" :item="item" />
          </span>
        </ListboxOption>
      </ListboxOptions>
    </Transition>
  </Listbox>
</template>

<script lang="ts" setup>
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/vue";
import ConfirmIcon from "~icons/line-md/confirm";
import ChevronDownIcon from "~icons/mdi/chevron-down";

interface Props {
  modelValue: any[];
  items: any[];
  keyProp?: string;
}

interface Emits {
  (event: "update:modelValue", payload: any[]): void;
}

const props = withDefaults(defineProps<Props>(), {
  keyProp: "id",
});

const emit = defineEmits<Emits>();

const model = useVModel(props, "modelValue", emit);
</script>
