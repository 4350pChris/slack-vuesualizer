import type { Channel } from '~~/types/Channel'
import type { User } from '~~/types/User'

export const useUsers = () => useState<User[]>('users', () => [])
export const useChannels = () => useState<Channel[]>('channels', () => [])
