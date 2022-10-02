<script lang="ts" setup>
const link = useShareLink()
const { copy, copied } = useClipboard({ source: link })
</script>

<template>
  <div class="text-center flex flex-col gap-4">
    <h2 class="text-lg font-bold">
      {{ $t("upload.success") }}
    </h2>
    <p>
      {{ $t("upload.done") }}
    </p>
    <div
      class="tooltip"
      :class="{ 'tooltip-open': copied }"
      :data-tip="copied ? $t('token.copied') : $t('token.copy')"
    >
      <button class="btn btn-sm btn-link gap-2" @click="copy()">
        {{ link }}
      </button>
    </div>
    <NuxtLink class="btn btn-primary btn-outline" to="/workspace">
      {{ $t("workspace.open") }}
    </NuxtLink>
  </div>
</template>
