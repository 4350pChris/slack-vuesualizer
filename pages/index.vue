<script lang="ts" setup>
import SlackIcon from '~icons/logos/slack-icon'
import UploadIcon from '~icons/mdi/upload'
import QuestionIcon from '~icons/line-md/question'

definePageMeta({
  layout: 'upload',
})

const { demoWorkspaceToken } = useRuntimeConfig().public
</script>

<template>
  <div class="flex flex-col max-w-md text-center lg:pt-4">
    <h1 class="flex flex-col justify-center items-center gap-2 mb-4">
      <SlackIcon class="w-32 h-32" />
      <span class="font-medium text-5xl">Vuesualizer</span>
    </h1>
    <BaseAppVersion />
    <p class="whitespace-pre-wrap text-lg mt-4 mb-2">
      {{ $t("description") }}
    </p>
    <a href="https://slack.com/help/articles/201658943-Export-your-workspace-data" target="_blank"
      rel="noopener noreferrer" class="btn btn-link mb-4">
      <span>{{ $t("exporthelp") }}</span>
      <QuestionIcon class="w-4 h-4" />
    </a>
    <NuxtLinkLocale v-if="demoWorkspaceToken" class="btn btn-link mb-4" :to="`/?token=${demoWorkspaceToken}`">
      <span>{{ $t("demo") }}</span>
    </NuxtLinkLocale>
    <NuxtLinkLocale class="btn btn-outline gap-2 mb-12" to="/upload">
      <UploadIcon class="w-6 h-6" />
      {{ $t("upload.button") }}
    </NuxtLinkLocale>
  </div>
</template>
