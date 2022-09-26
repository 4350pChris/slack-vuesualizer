<template>
  <div class="antialiased">
    <NuxtLoadingIndicator />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const { canonicalHost } = useRuntimeConfig();

useHead({
  title: "Slack Vuesualizer",
  meta: [
    {
      name: "description",
      content: t("description"),
    },
    {
      name: "format-detection",
      content: "telephone=no",
    },
    {
      name: "og:title",
      content: "Slack Vuesualizer",
    },
    {
      name: "og:description",
      content: t("description"),
    },
    {
      property: "og:image",
      content: "/favicon.png",
    },
    {
      property: "og:type",
      content: "website",
    },
    {
      property: "og:url",
      content: canonicalHost,
    },
    {
      property: "twitter:card",
      content: "summary_large_image",
    },
    {
      name: "twitter:title",
      content: "Slack Vuesualizer",
    },
    {
      name: "twitter:description",
      content: t("description"),
    },
    {
      property: "twitter:image",
      content: "/favicon.png",
    },
    {
      property: "twitter:url",
      content: canonicalHost,
    },
  ],
  link: [
    {
      rel: "icon",
      href: "/favicon.png",
    },
    {
      rel: "mask-icon",
      href: "/Slack_Mark_Monochrome_White.svg",
      color: "#000000",
    },
    {
      rel: "apple-touch-icon",
      href: "/favicon.png",
    },
  ],
});

useSchemaOrg([
  definePerson({
    name: "Chris-Robin Ennen",
    link: ["https://github.com/4350pChris"],
  }),
  defineWebSite({ name: "Slack Vuesualizer" }),
  defineWebPage(),
]);
</script>
