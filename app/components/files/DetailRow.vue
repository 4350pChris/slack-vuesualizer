<script lang="ts" setup>
import type { ShownFile } from '~~/types/File'
import AudioIcon from '~icons/mdi/headphones'

interface Props {
  channel: string
  file: ShownFile
}

const props = defineProps<Props>()

const users = useUsers()

const user = computed(() => users.value.find(u => u.id === props.file.user))

const { isAudioFile, previewImage, size, timestamp } = useFile(toRef(props, 'file'))
</script>

<template>
  <div class="flex gap-4 items-start">
    <div class="h-20 w-20 rounded-box">
      <img
        v-if="previewImage"
        :src="previewImage"
        class="max-h-full max-w-full truncate rounded-box"
        loading="lazy"
        :alt="file.title"
      >
      <AudioIcon
        v-else-if="isAudioFile(file)"
        class="w-full h-full p-4 text-current"
      />
    </div>
    <div class="flex flex-col">
      <span v-if="timestamp" class="text-sm">{{ $d(timestamp, "long") }}</span>
      <span class="text-sm font-bold">{{ channel }}</span>
      <span v-if="user">{{ useUserName(user) }}</span>
      <a
        class="fancy-link"
        :href="file.url_private"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span>{{ file.title }}</span>
      </a>
      <div class="flex gap-2">
        <span>{{ file.pretty_type }}</span>
        <span>{{ size }}</span>
      </div>
    </div>
  </div>
</template>
