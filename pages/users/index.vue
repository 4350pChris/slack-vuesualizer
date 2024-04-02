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

// h-16 md:h-24 lg:h-44 + py-4 in pixels
const itemSize = computed(() => {
  const padding = 16 * 2
  if (mobile.value) return 64 + padding
  return 96 + padding
})

const { registerAutoFlip } = useFlip()

registerAutoFlip((to) => to.path.includes('/users'))
</script>

<template>
  <section class="flex flex-col gap-4 pt-4 h-full">
    <input v-model="query" type="text" :placeholder="$t('search.users')"
      class="flex-none w-full max-w-lg input input-bordered">
    <RecycleScroller :prerender="10" class="h-full pr-4 menu bg-base-100 rounded-box" :items="results" :item-size
      key-field="id" v-slot="{ item }" listTag="ul" itemTag="li">
      <NuxtLinkLocale class="flex justify-start gap-4 p-4 transition" :to="`/users/${item.id}`">
        <UserAvatar :key="item.id" class="h-16 md:h-24 w-16 md:w-24 rounded-box" :user="item" />
        <div class="flex flex-col gap-2">
          <UserName :user="item" #default="{ username }">
            <span class="text-lg md:text-xl">{{ username }}</span>
          </UserName>
          <UserEmail v-if="item.profile.email" :email="item.profile.email" class="text-sm" @click.stop />
        </div>
      </NuxtLinkLocale>
    </RecycleScroller>
  </section>
</template>

<style scoped>
.hover>a {}
</style>
