<template>
  <div class="avatar">
    <div class="w-12 h-12 rounded-full">
      <img :src="src" />
    </div>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  src: string;
}

defineProps<Props>();
</script>
