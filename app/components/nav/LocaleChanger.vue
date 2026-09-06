<script lang="ts" setup>
import {
  Listbox,
  ListboxButton,
  ListboxLabel,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/vue'

</script>

<template>
  <Listbox v-model="$i18n.locale">
    <div class="relative">
      <ListboxLabel class="sr-only">
        {{ $t("language") }}
      </ListboxLabel>
      <ListboxButton class="btn btn-ghost btn-circle" :title="$t('changeLanguage')">
        <Icon name="ion:language" aria-hidden="true" class="w-6 h-6" />
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
              <Icon
                v-if="locale === 'de'"
                name="twemoji:flag-germany"
                class="w-6 h-6"
                :class="[active || selected ? 'grayscale-0' : 'grayscale']"
              />
              <Icon
                v-else-if="locale === 'en'"
                name="twemoji:flag-united-kingdom"
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
