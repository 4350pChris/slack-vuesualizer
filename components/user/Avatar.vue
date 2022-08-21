<template>
  <div class="avatar">
    <div v-bind="$attrs">
      <img :src="src" decoding="async" />
    </div>
  </div>
</template>

<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<script lang="ts" setup>
interface Props {
  src: string;
}

defineProps<Props>();
</script>
