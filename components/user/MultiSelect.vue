<template>
  <Listbox
    v-model="model"
    multiple
    as="div"
    class="relative text-sm max-w-[12rem] w-full"
    v-slot="{ open }"
  >
    <ListboxButton
      class="flex w-full justify-between items-center px-4 py-1 ring-1 ring-black/5 dark:ring-slate-300/25 hover:bg-base-200/50 dark:hover:bg-slate-200/10 transition rounded-box"
    >
      <span class="truncate">
        {{
          $t("filter.from") +
          (model.length === 0
            ? ""
            : " " +
              (model.length === 1
                ? model[0].profile.display_name
                : `${model.length} ${$t("user", 2)}`))
        }}
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
          v-for="user in users"
          :key="user.id"
          :value="user"
          class="rounded-box bg-base-100 ui-active:bg-base-200 text-base-content transition pl-10 pr-4 py-2 select-none cursor-pointer relative"
          v-slot="{ selected }"
        >
          <span
            v-if="selected"
            class="flex absolute inset-y-0 left-3 items-center"
          >
            <ConfirmIcon class="w-6 h-6" />
          </span>
          <span class="truncate block">{{
            user.profile.display_name || user.profile.real_name
          }}</span>
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
import type { User } from "~~/types/User";
import ChevronDownIcon from "~icons/mdi/chevron-down";

interface Props {
  modelValue: User[];
}

interface Emits {
  (event: "update:modelValue", payload: User[]): void;
}

const props = defineProps<Props>();

const emit = defineEmits<Emits>();

const users = useUsers();

const model = useVModel(props, "modelValue", emit);
</script>
