import type { Dm } from '~/types/Dm'
import type { Channel } from '~~/types/Channel'
import type { User } from '~~/types/User'

export const useUsers = () => useState<User[]>('users', () => [])
export const useChannels = () => useState<Channel[]>('channels', () => [])
export const useDms = () => useState<Dm[]>('dms', () => [])
export const useGroups = () => useState<Channel[]>('groups', () => [])
