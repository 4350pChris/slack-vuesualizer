<template>
  <div class="text-center flex flex-col gap-2">
    <h2 class="text-lg font-bold">{{ $t("upload.success") }}</h2>
    <p>
      {{ $t("upload.done") }}
    </p>
    <div
      class="tooltip"
      :class="{ 'tooltip-open': copied }"
      :data-tip="copied ? $t('token.copied') : $t('token.copy')"
    >
      <button class="btn btn-link gap-2" @click="copy()">
        <ClipboardIcon class="w-4 h-4" />
        {{ link }}
      </button>
    </div>
    <NuxtLink class="btn btn-primary btn-outline mt-4" to="/workspace">
      {{ $t("workspace.open") }}
    </NuxtLink>
  </div>
</template>

<script lang="ts" setup>
import ClipboardIcon from "~icons/mdi/clipboard-edit-outline";
const link = useShareLink();
const { copy, copied } = useClipboard({ source: link });
</script>
