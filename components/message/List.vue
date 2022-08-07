<template></template>

<script lang="ts" setup>
import { Message } from "~~/types/Message.js";

interface Props {
  messages: Message[];
}

defineProps<Props>();
</script>
