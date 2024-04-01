import type { MaybeRef } from '@vueuse/core'
import type { User } from '~~/types/User'

export const useUserName = (user: MaybeRef<User>) => {
  const u = unref(user)
  return u.profile.display_name || u.profile.real_name || u.name || u.real_name || `${u.profile.first_name} ${u.profile.last_name}`
}

export function useWithUsernames() {
  const { t } = useI18n()

  const users = useUsers()

  const findUser = (id: string) => users.value.find(u => u.id === id)

  const withUsernames = (userIds: MaybeRefOrGetter<string[]>) => {
    const keyedMembers = toValue(userIds).reduce(({ usernames, unknown }, id) => {
      const user = findUser(id)
      let username = user && useUserName(user)
      if (username) {
        return {
          usernames: [...usernames, username],
          unknown,
        }
      }
      return {
        usernames,
        unknown: unknown + 1,
      }
    }, { usernames: [] as string[], unknown: 0 });

    let memberString = keyedMembers.usernames.join(', ')

    if (keyedMembers.unknown > 0) {
      if (memberString.length > 0) {
        memberString += ' & '
      }
      memberString += t('user.unknown', keyedMembers.unknown)
    }

    return { keyedMembers, memberString }
  }

  return { withUsernames }
}
