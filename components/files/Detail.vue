<template>
  <div class="flex gap-4 items-start">
    <div class="h-full w-40">
      <img
        v-if="previewImage"
        :src="previewImage"
        class="max-h-full max-w-full"
        loading="lazy"
        :alt="file.title"
      />
    </div>
    <div class="flex flex-col">
      <div class="flex items-center gap-4">
        <span>{{ user.profile.display_name || user.profile.real_name }}</span>
        <span class="text-sm">{{ $d(tsToDate(file.timestamp), "long") }}</span>
      </div>
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

<script lang="ts" setup>
import filesize from "filesize";
import type {
  PdfFile,
  DocFile,
  ShownFile,
  ImageFile,
  VideoFile,
} from "~~/types/File";
import { useI18n } from "vue-i18n";

interface Props {
  file: ShownFile;
}

const { locale } = useI18n();

const props = defineProps<Props>();

const users = useUsers();

const user = computed(() => users.value.find((u) => u.id === props.file.user));

const tsToDate = useTsToDate();

function fileHasThumbPdf(f: ShownFile): f is PdfFile | DocFile {
  return "thumb_pdf" in f;
}

function fileHasThumb80(f: ShownFile): f is ImageFile {
  return "thumb_80" in f;
}

function fileHasThumbVideo(f: ShownFile): f is VideoFile {
  return "thumb_video" in f;
}

const size = computed(() =>
  filesize(props.file.size, { locale: locale.value })
);

const previewImage = computed(() => {
  if (fileHasThumbPdf(props.file)) {
    return props.file.thumb_pdf;
  } else if (fileHasThumb80(props.file)) {
    return props.file.thumb_80;
  } else if (fileHasThumbVideo(props.file)) {
    return props.file.thumb_video;
  }
});

if (props.file.mimetype.startsWith("video")) {
  console.log(props.file);
}
</script>
