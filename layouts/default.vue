<script lang="ts" setup>
const users = useUsers()

const { data: fetchedUsers } = await useFetch('/api/users', {
  headers: useRequestHeaders(['cookie']),
})

whenever(fetchedUsers, u => (users.value = u), { immediate: true })

const { data: fetchedChannels } = await useFetch('/api/channels', {
  headers: useRequestHeaders(['cookie']),
})

const channels = useChannels()

whenever(fetchedChannels, c => (channels.value = c), { immediate: true })

const dms = useDms()

const { data: fetchedDms } = await useFetch('/api/dms', {
  headers: useRequestHeaders(['cookie']),
})

whenever(fetchedDms, d => (dms.value = d), { immediate: true })
</script>

<template>
  <div>
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
