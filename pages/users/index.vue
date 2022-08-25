<template>
  <section>
    <div class="pt-4">
      <ul class="list-none flex flex-col gap-4 md:gap-6">
        <li v-for="user in users" :key="user.id">
          <UserInfo :user="user" />
        </li>
      </ul>
    </div>
  </section>
</template>

<script lang="ts" setup>
const users = useUsers();
</script>
