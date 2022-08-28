<template>
  <div class="p-2">
    <div class="font-bold mb-2">Attachments</div>
    <ul
      v-for="attachment in attachments"
      :key="attachment.id"
      class="flex flex-col gap-2"
    >
      <li>
        <p>{{ attachment.fallback }}</p>
        <a
          v-if="attachment.title_link"
          class="link"
          :href="attachment.title_link"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>{{ attachment.title_link }}</span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import type { Attachment } from "~~/types/Message";

interface Props {
  attachments: Attachment[];
}

defineProps<Props>();
</script>
