<script lang="ts" setup>
const users = $(useUsers())

const query = $ref('')

const results = $(useArrayFilter($$(users), ({ profile, real_name, name }) =>
  [
    name,
    real_name,
    profile.display_name,
    profile.email,
    profile.first_name,
    profile.last_name,
    profile.real_name,
  ].some(s =>
    s?.toLocaleLowerCase().includes(query.toLocaleLowerCase()),
  ),
))
</script>

<template>
  <section class="flex flex-col gap-4 pt-4 h-full">
    <input
      v-model="query"
      type="text"
      :placeholder="$t('search.users')"
      class="flex-none w-full max-w-lg input input-bordered"
    >
    <TransitionGroup
      name="list"
      class="overflow-y-auto overflow-x-hidden list-none flex flex-col gap-6 md:gap-8"
      tag="ul"
    >
      <li v-for="user in results" :key="user.id">
        <UserInfo :user="user" />
      </li>
      <li v-if="!results.length" key="empty">
        {{ $t("noresults") }}
      </li>
    </TransitionGroup>
  </section>
</template>
