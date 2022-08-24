import type { Profile } from "./User";

export type Reaction = {
  name: string;
  users: string[];
  count: number;
};

export type Reply = {
  user: string;
  ts: string;
};

export type File = {
  id: string;
  name: string;
  title: string;
  mimetype: string;
  user: string;
  url_private: string;
  permalink: string;
  mode?: string;
};

export type TextLeaf = {
  style?: {
    bold?: boolean;
  };
  type: "text";
  text: string;
};

export type EmojiLeaf = {
  type: "emoji";
  name: string;
  unicode?: string;
};

export type UserLeaf = {
  type: "user";
  user_id: string;
};

export type BroadcastLeaf = {
  type: "broadcast";
  range: string;
};

export type LinkLeaf = {
  type: "link";
  url: string;
};

export type ChannelLeaf = {
  type: "channel";
  channel_id: string;
};

export type RichTextQuote = {
  type: "rich_text_quote";
  elements: Block[];
};

export type RichTextSection = {
  type: "rich_text_section";
  elements: Block[];
};

export type RichTextList = {
  type: "rich_text_list";
  elements: Block[];
  indent: number;
  border?: number;
  style: "ordered" | "bullet";
};

export type RichText = {
  type: "rich_text";
  block_id: string;
  elements: Block[];
};

export type Block =
  | RichText
  | RichTextSection
  | RichTextQuote
  | RichTextList
  | TextLeaf
  | EmojiLeaf
  | BroadcastLeaf
  | LinkLeaf
  | UserLeaf
  | ChannelLeaf;

export type ApiMessage = {
  _id: string;
  type: string;
  channel: string;
  subtype?: string;
  ts: string;
  user: string;
  text: string;
  user_profile?: Pick<
    Profile,
    "image_72" | "first_name" | "real_name" | "display_name"
  > & { avatar_hash: string };
  reactions?: Reaction[];
  replies?: Reply[];
  reply_users?: string[];
  reply_users_count?: number;
  reply_count?: number;
  files?: File[];
  blocks?: Block[];
};

export type Message = Omit<ApiMessage, "replies"> & {
  reply?: boolean;
};
