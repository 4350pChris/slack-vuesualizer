<script lang="ts" setup>
let users = $(useUsers())

const { data: fetchedUsers } = $(await useFetch('/api/users', {
  headers: useRequestHeaders(['cookie']),
}))

watchEffect(() => (users = fetchedUsers))

const { data: fetchedChannels } = $(await useFetch('/api/channels', {
  headers: useRequestHeaders(['cookie']),
}))

let channels = $(useChannels())

watchEffect(() => (channels = fetchedChannels))
</script>

<template>
  <div>
    <NavHeader />
    <div class="container mx-auto bg-base-100 drawer drawer-mobile">
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
