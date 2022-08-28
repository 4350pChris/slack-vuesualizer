<template>
  <div class="antialiased">
    <NuxtLoadingIndicator />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script lang="ts" setup>
useHead({
  title: "Slack Vuesualizer",
  meta: [
    {
      name: "format-detection",
      content: "telephone=no",
    },
  ],
});
</script>
