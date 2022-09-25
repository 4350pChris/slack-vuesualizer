<template>
  <div class="text-center">
    <p class="text-lg font-bold mb-2">{{ $t("upload.success") }}</p>
    <i18n-t keypath="upload.done" tag="p">
      <code class="block font-medium">{{ token }}</code>
    </i18n-t>
    <NuxtLink class="btn btn-primary btn-outline mt-4" to="/workspace">
      {{ $t("workspace.open") }}
    </NuxtLink>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  token: string;
}

defineProps<Props>();
</script>
