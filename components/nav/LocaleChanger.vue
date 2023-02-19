<script lang="ts" setup>
import {
  Listbox,
  ListboxButton,
  ListboxLabel,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/vue'
import LanguageIcon from '~icons/ion/language'

const GermanFlag = defineAsyncComponent(
  () => import('~icons/twemoji/flag-germany'),
)
const UkFlag = defineAsyncComponent(
  () => import('~icons/twemoji/flag-united-kingdom'),
)
</script>

<template>
  <Listbox v-model="$i18n.locale">
    <div class="relative">
      <ListboxLabel class="sr-only">
        {{ $t("language") }}
      </ListboxLabel>
      <ListboxButton class="btn btn-ghost btn-circle" title="Change language">
        <LanguageIcon aria-hidden="true" class="w-6 h-6" />
      </ListboxButton>
      <Transition name="slide-y">
        <ListboxOptions
          class="z-10 absolute left-0 mt-1 rounded-md shadow-lg bg-base-100 dark:border dark:border-slate-300/25"
        >
          <ListboxOption
            v-for="locale in $i18n.availableLocales"
            v-slot="{ active, selected }"
            :key="`locale-${locale}`"
            as="template"
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
                v-t="{ path: 'thisLanguage', locale }"
                class="capitalize"
              />
            </li>
          </ListboxOption>
        </ListboxOptions>
      </Transition>
    </div>
  </Listbox>
</template>
