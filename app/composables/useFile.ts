import { filesize } from 'filesize'
import { useI18n } from 'vue-i18n'
import type { DocFile, ImageFile, PdfFile, ShownFile, VideoFile } from '~/types/File'

export const useFile = (file: Ref<ShownFile>) => {
  const tsToDate = useTsToDate()

  const timestamp = computed(() => tsToDate(file.value.timestamp))

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

  const { locale } = useI18n()

  const size = computed(() =>
    filesize(file.value.size, { locale: locale.value }),
  )

  const previewImage = computed(() => {
    const f = unref(file)
    if (fileHasThumbPdf(f))
      return f.thumb_pdf
    else if (fileHasThumb80(f))
      return f.thumb_80
    else if (fileHasThumbVideo(f))
      return f.thumb_video
  })

  return {
    timestamp,
    previewImage,
    size,
    isAudioFile,
  }
}
