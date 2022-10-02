<script lang="ts" setup>
import { filesize } from 'filesize'
import { useI18n } from 'vue-i18n'
import type {
  DocFile,
  ImageFile,
  PdfFile,
  ShownFile,
  VideoFile,
} from '~~/types/File'
import AudioIcon from '~icons/mdi/headphones'

interface Props {
  channel: string
  file: ShownFile
}

const props = defineProps<Props>()

const { locale } = $(useI18n())

const users = $(useUsers())

const user = $computed(() => users.find(u => u.id === props.file.user))

const tsToDate = useTsToDate()

function fileHasThumbPdf(f: ShownFile): f is PdfFile | DocFile {
  return 'thumb_pdf' in f
}

function fileHasThumb80(f: ShownFile): f is ImageFile {
  return 'thumb_80' in f
}

function fileHasThumbVideo(f: ShownFile): f is VideoFile {
  return 'thumb_video' in f
}

function isAudioFile(f: ShownFile) {
  return f.mimetype.startsWith('audio')
}

const size = $computed(() =>
  filesize(props.file.size, { locale }),
)

const previewImage = $computed(() => {
  if (fileHasThumbPdf(props.file))
    return props.file.thumb_pdf
  else if (fileHasThumb80(props.file))
    return props.file.thumb_80
  else if (fileHasThumbVideo(props.file))
    return props.file.thumb_video
})
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
      <span class="text-sm">{{ $d(tsToDate(file.timestamp), "long") }}</span>
      <span class="text-sm font-bold">{{ channel }}</span>
      <span>{{ useUserName(user) }}</span>
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
