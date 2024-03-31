import type { Dm } from '~/types/Dm'
import type { Channel } from '~~/types/Channel'
import type { User } from '~~/types/User'

export const useUsers = () => useState<User[]>('users', () => [])
