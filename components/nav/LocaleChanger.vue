<template>
  <Listbox v-model="$i18n.locale">
    <div class="relative">
      <ListboxLabel class="sr-only">{{ $t("language") }}</ListboxLabel>
      <ListboxButton class="btn btn-ghost btn-circle">
        <span aria-hidden="true" class="w-6 h-6 i-ion:language" />
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
              <span
                class="w-6 h-6 grayscale"
                :class="{
                  'i-twemoji:flag-germany': locale === 'de',
                  'i-twemoji:flag-united-kingdom': locale === 'en',
                  'grayscale-0': active || selected,
                }"
              ></span>
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
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  ListboxLabel,
} from "@headlessui/vue";
</script>
