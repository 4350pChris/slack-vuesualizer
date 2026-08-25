<script lang="ts" setup>
import { provideUseId } from '@headlessui/vue'
import { useI18n } from 'vue-i18n'

provideUseId(() => useId())

const { t } = useI18n()

const config = useRuntimeConfig()

useHead({
  title: 'Slack Vuesualizer',
  meta: [
    {
      name: 'description',
      content: t('description'),
    },
    {
      name: 'format-detection',
      content: 'telephone=no',
    },
    {
      name: 'og:title',
      content: 'Slack Vuesualizer',
    },
    {
      name: 'og:description',
      content: t('description'),
    },
    {
      property: 'og:image',
      content: '/vuesualizer.png',
    },
    {
      property: 'og:type',
      content: 'website',
    },
    {
      property: 'og:url',
      content: config.public.siteUrl,
    },
    {
      property: 'twitter:card',
      content: 'summary',
    },
    {
      name: 'twitter:title',
      content: 'Slack Vuesualizer',
    },
    {
      name: 'twitter:description',
      content: t('description'),
    },
    {
      property: 'twitter:image',
      content: '/vuesualizer.png',
    },
    {
      property: 'twitter:url',
      content: config.public.siteUrl,
    },
  ],
  link: [
    {
      rel: 'icon',
      href: '/favicon.png',
    },
    {
      rel: 'mask-icon',
      href: '/Slack_Mark_Monochrome_White.svg',
      color: '#000000',
    },
    {
      rel: 'apple-touch-icon',
      href: '/favicon.png',
    },
  ],
})
</script>

<template>
  <div class="antialiased">
    <NuxtLoadingIndicator />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
