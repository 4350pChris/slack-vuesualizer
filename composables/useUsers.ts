import type { MaybeRef } from '@vueuse/core'
import type { User } from '~~/types/User'

export const useUserName = (user: MaybeRef<User>) => {
  const u = unref(user)
  return u.profile.display_name || u.profile.real_name
}
