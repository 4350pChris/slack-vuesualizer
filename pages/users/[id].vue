<script lang="ts" setup>
const { registerAutoFlip } = useFlip()

registerAutoFlip((to) => to.path.includes('/users'))

const users = useUsers()
const route = useRoute()

const user = computed(() => users.value.find(user => user.id === route.params.id))
</script>

<template>
  <section class="h-full pt-4">
    <div v-if="user" class="flex flex-col gap-4 justify-start">
      <div
        class="flex max-md:flex-col max-md:items-center md:items-end gap-8 to-base-100 rounded-t-box p-4"
        :style="{ 'background': `linear-gradient(#${user.color}, var(--tw-gradient-to))` }">
        <UserAvatar :user class="mask mask-squircle w-60 md:-mb-12" />
        <div class="flex flex-col gap-4 text-lg">
          <UserName :user #default="{ username }">
            <h1 class="font-bold text-5xl">{{ username }}</h1>
          </UserName>
          <p>{{ user.profile.title }}</p>
          <UserTimezone v-if="user.tz" :timezone="user.tz" />
        </div>
      </div>
      <div class="flex flex-col gap-4 mt-8">
        <h2 class="text-lg font-bold uppercase">{{ $t('user.contact') }}</h2>
        <UserEmail v-if="user.profile.email" :email="user.profile.email" />
        <UserPhone v-if="user.profile.phone" :phone="user.profile.phone" />
      </div>
    </div>
    <div v-else>
      <p class="text-lg">
        {{ $t('user.unknown') }}
      </p>
    </div>
  </section>
</template>
