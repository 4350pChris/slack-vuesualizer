<script lang="ts" setup>
import FileIcon from '~icons/mdi/file'
import type { File } from '~~/types/File'

interface Props {
  files: File[]
}

defineProps<Props>()
</script>

<template>
  <div class="p-2 flex gap-2">
    <div>
      <FileIcon class="w-8 h-8" />
    </div>
    <div>
      <div class="font-bold mb-2">
        {{ $t("file", files.length) }}
      </div>
      <ul v-for="file in files" :key="file.id">
        <li>
          <a
            v-if="'name' in file"
            class="fancy-link"
            :href="file.url_private"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>{{ file.name }}</span>
          </a>
          <span v-else>{{ file.mode }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
