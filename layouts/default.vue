<template>
  <div>
    <NavHeader />
    <div class="container mx-auto bg-base-100 drawer drawer-mobile">
      <input id="drawer" class="drawer-toggle" type="checkbox" />
      <main
        class="h-[calc(100vh-4rem)] overflow-x-hidden drawer-content px-4 md:px-6 lg:px-8 mb-2 mt-16"
      >
        <slot />
      </main>
      <NavSideDrawer />
    </div>
  </div>
</template>

<script lang="ts" setup>
const users = useUsers();

const { data: fetchedUsers } = await useFetch("/api/users");

watchEffect(() => (users.value = fetchedUsers.value));

const { data } = await useFetch("/api/channels");

if (data.value.length === 0) {
  await navigateTo("/upload");
}

const channels = useChannels();

watchEffect(() => (channels.value = data.value));
</script>
