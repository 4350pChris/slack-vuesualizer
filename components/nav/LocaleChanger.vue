<template>
  <Listbox v-model="$i18n.locale">
    <div class="relative">
      <ListboxLabel class="sr-only">{{ $t("language") }}</ListboxLabel>
      <ListboxButton class="btn btn-ghost btn-circle">
        <LanguageIcon aria-hidden="true" class="w-6 h-6" />
      </ListboxButton>
      <Transition name="slide-y">
        <ListboxOptions
          class="z-10 absolute left-0 mt-1 rounded-md shadow-lg bg-base-100 dark:border dark:border-slate-300/25"
        >
          <ListboxOption
            as="template"
            v-slot="{ active, selected }"
            v-for="locale in $i18n.availableLocales"
            :key="`locale-${locale}`"
            :value="locale"
          >
            <li
              class="gap-2 btn btn-ghost flex-nowrap w-max-content justify-start"
            >
              <GermanFlag
                v-if="locale === 'de'"
                class="w-6 h-6"
                :class="[active || selected ? 'grayscale-0' : 'grayscale']"
              />
              <UkFlag
                v-else-if="locale === 'en'"
                class="w-6 h-6"
                :class="[active || selected ? 'grayscale-0' : 'grayscale']"
              />
              <span
                class="capitalize"
                v-t="{ path: 'thisLanguage', locale }"
              ></span>
            </li>
          </ListboxOption>
        </ListboxOptions>
      </Transition>
    </div>
  </Listbox>
</template>

<script lang="ts" setup>
import LanguageIcon from "~icons/ion/language";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  ListboxLabel,
} from "@headlessui/vue";

const GermanFlag = defineAsyncComponent(
  () => import("~icons/twemoji/flag-germany")
);
const UkFlag = defineAsyncComponent(
  () => import("~icons/twemoji/flag-united-kingdom")
);
</script>
