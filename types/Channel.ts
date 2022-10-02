export interface Topic {
  value: string
  creator: string
}

export interface Channel {
  _id: string
  id: string
  name: string
  created: number
  creator: string
  members: string[]
  topic: Topic
  purpose: Topic
  is_general: boolean
}
