import type { Profile } from './User'
import type { File } from './File'

export interface Reaction {
  name: string
  users: string[]
  count: number
}

export interface Reply {
  user: string
  ts: string
}

export interface Attachment {
  id: number
  color: string
  fallback: string
  title_link: string
}

export interface TextLeaf {
  style?: {
    bold?: boolean
    italic?: boolean
    strike?: boolean
    code?: boolean
  }
  type: 'text'
  text: string
}

export interface EmojiLeaf {
  type: 'emoji'
  name: string
  unicode?: string
}

export interface UserLeaf {
  type: 'user'
  user_id: string
}

export interface BroadcastLeaf {
  type: 'broadcast'
  range: string
}

export interface LinkLeaf {
  type: 'link'
  url: string
}

export interface ChannelLeaf {
  type: 'channel'
  channel_id: string
}

export interface RichTextQuote {
  type: 'rich_text_quote'
  elements: Block[]
}

export interface RichTextPreformatted {
  type: 'rich_text_preformatted'
  elements: Block[]
}

export interface RichTextSection {
  type: 'rich_text_section'
  elements: Block[]
}

export interface RichTextList {
  type: 'rich_text_list'
  elements: Block[]
  indent: number
  border?: number
  style: 'ordered' | 'bullet'
}

export interface RichText {
  type: 'rich_text'
  block_id: string
  elements: Block[]
}

export type Block =
  | RichText
  | RichTextSection
  | RichTextQuote
  | RichTextList
  | RichTextPreformatted
  | TextLeaf
  | EmojiLeaf
  | BroadcastLeaf
  | LinkLeaf
  | UserLeaf
  | ChannelLeaf

export interface ApiMessage {
  _id: string
  type: string
  channel: string
  subtype?: string
  ts: string
  user?: string
  bot_id?: string
  text: string
  user_profile?: Pick<
    Profile,
    'image_72' | 'first_name' | 'real_name' | 'display_name'
  > & { avatar_hash: string }
  reactions?: Reaction[]
  replies?: Reply[]
  reply_users?: string[]
  reply_users_count?: number
  reply_count?: number
  files?: File[]
  blocks?: Block[]
  attachments?: Attachment[]
}

export type Message = Omit<ApiMessage, 'replies'> & {
  reply?: boolean
  last_reply?: boolean
}
