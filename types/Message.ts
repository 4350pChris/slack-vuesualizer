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
};

export type Message = {
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
  >;
  reactions?: Reaction[];
  replies?: Reply[];
  reply_users?: string[];
  reply_users_count?: number;
  reply_count?: number;
  files?: File[];
};
