<script lang="ts" setup>
import { breakpointsTailwind } from '@vueuse/core';
import { RecycleScroller } from 'vue-virtual-scroller'

const users = useUsers()

const query = useState('user-query', () => '')

const results = useArrayFilter(users, ({ profile, real_name, name }) =>
  [
    name,
    real_name,
    profile.display_name,
    profile.email,
    profile.first_name,
    profile.last_name,
    profile.real_name,
  ].some(s =>
    s?.toLocaleLowerCase().includes(query.value.toLocaleLowerCase()),
  ),
)

const { smaller } = useBreakpoints(breakpointsTailwind)

const mobile = smaller('md')
const tablet = smaller('lg')

// h-16 md:h-24 lg:h-44 + py-4 in pixels
const itemSize = computed(() => {
  const padding = 16 * 2
  if (mobile.value) return 64 + padding
  if (tablet.value) return 96 + padding
  return 176 + padding
})
</script>

<template>
  <section class="flex flex-col gap-4 pt-4 h-full">
    <input v-model="query" type="text" :placeholder="$t('search.users')"
      class="flex-none w-full max-w-lg input input-bordered">
    <RecycleScroller :prerender="10" class="h-full" :items="results" :item-size key-field="id" v-slot="{ item }">
      <UserInfo class="py-4" :user="item" />
    </RecycleScroller>
  </section>
</template>
