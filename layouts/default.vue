<template>
  <div>
    <NavHeader />
    <div class="container mx-auto bg-base-100 drawer drawer-mobile">
      <input id="drawer" class="drawer-toggle" type="checkbox" />
      <div class="overflow-x-hidden drawer-content">
        <main class="h-full px-4 md:px-6 lg:px-8 pb-2 pt-16 lg:pt-20">
          <slot />
        </main>
      </div>
      <NavSideDrawer />
    </div>
  </div>
</template>

<script lang="ts" setup>
const users = useUsers();

const { data: fetchedUsers } = await useFetch("/api/users");

users.value = fetchedUsers.value;
</script>
