export interface HiddenFile {
  id: string
  mode: 'hidden_by_limit'
}

export interface ShownFile {
  id: string
  mode: string
  name: string
  title: string
  mimetype: string
  user: string
  url_private: string
  permalink: string
  timestamp: number
  pretty_type: string
  filetype: string
  size: number
}

export type PdfFile = ShownFile & {
  filetype: 'pdf'
  thumb_pdf: string
}

export type DocFile = ShownFile & {
  filetype: 'docx'
  converted_pdf: string
  thumb_pdf: string
}

export type ImageFile = ShownFile & {
  thumb_64: string
  thumb_80: string
}

export type VideoFile = ShownFile & {
  thumb_video: string
  mp4: string
}

export type File = HiddenFile | ShownFile

export interface SearchResult {
  _id: string
  channel: string
  file: ShownFile
}
