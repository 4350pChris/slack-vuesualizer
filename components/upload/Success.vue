<template>
  <p class="text-lg font-bold">{{ $t("upload.success") }}</p>
  <i18n-t keypath="upload.done" tag="p">
    <code class="block font-medium">{{ token }}</code>
  </i18n-t>
  <NuxtLink class="btn btn-primary btn-outline" to="/">
    {{ $t("workspace.open") }}
  </NuxtLink>
</template>

<script lang="ts" setup>
interface Props {
  token: string;
}

defineProps<Props>();
</script>
