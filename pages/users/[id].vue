<script lang="ts" setup>
const { registerAutoFlip } = useFlip()

registerAutoFlip((to) => to.path.includes('/users'))

const users = useUsers()
const route = useRoute()

const user = computed(() => users.value.find(user => user.id === route.params.id))
</script>

<template>
  <section class="h-full pt-4">
    <div v-if="user" class="flex flex-col gap-4 items-center">
      <UserAvatar :user class="mask mask-squircle w-60 mx-auto" />
      <UserInfo :user class="text-center" />
    </div>
    <div v-else>
      <p class="text-lg">
        {{ $t('user.unknown') }}
      </p>
    </div>
  </section>
</template>
