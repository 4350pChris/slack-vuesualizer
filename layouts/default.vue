<script lang="ts" setup>
import { SpeedInsights } from '@vercel/speed-insights/vue';
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'

const users = useUsers()

const { data: fetchedUsers } = await useFetch('/api/users', {
  headers: useRequestHeaders(['cookie']),
})

whenever(fetchedUsers, u => (users.value = u), { immediate: true })

const { load } = useChannels()

await load()
</script>

<template>
  <div>
    <SpeedInsights />
    <NavHeader />
    <div class="container mx-auto bg-base-100 drawer lg:drawer-open">
      <input id="drawer" class="drawer-toggle" type="checkbox">
      <main
        class="h-[calc(100vh-4rem)] overflow-x-hidden drawer-content px-4 md:px-6 lg:px-8 mt-16 pb-2"
      >
        <slot />
      </main>
      <NavSideDrawer />
    </div>
  </div>
</template>
