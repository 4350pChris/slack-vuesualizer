<template>
  <div class="bg-base-100 drawer drawer-mobile">
    <input id="drawer" class="drawer-toggle" type="checkbox" />
    <div class="drawer-content">
      <NavHeader />
      <main class="container mx-auto p-4">
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
