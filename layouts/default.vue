<template>
  <div class="bg-base-100 drawer drawer-mobile">
    <input id="drawer" class="drawer-toggle" type="checkbox" />
    <div class="overflow-x-hidden drawer-content">
      <NavHeader />
      <main class="w-full h-[calc(100%-64px)] max-w-4xl mx-auto p-6">
        <slot />
      </main>
    </div>
    <SideDrawer />
  </div>
</template>

<script lang="ts" setup>
const users = useUsers();

const { data: fetchedUsers } = await useFetch("/api/users");

users.value = fetchedUsers.value;
</script>
