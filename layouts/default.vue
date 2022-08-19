<template>
  <div class="bg-base-100 drawer drawer-mobile">
    <input id="drawer" class="drawer-toggle" type="checkbox" />
    <div class="overflow-x-hidden drawer-content">
      <NavHeader />
      <main class="container h-[calc(100%-64px)] p-4 md:p-6 lg:p-8">
        <slot />
      </main>
    </div>
    <NavSideDrawer />
  </div>
</template>

<script lang="ts" setup>
const users = useUsers();

const { data: fetchedUsers } = await useFetch("/api/users");

users.value = fetchedUsers.value;
</script>
