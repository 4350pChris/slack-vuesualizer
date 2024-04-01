<script lang="ts" setup generic="T extends {id: string, name: string}">
type Props = {
  channels: T[]
}

defineProps<Props>()

const show = ref(false)
</script>

<template>
  <button class="capitalize menu-dropdown-toggle" :class="{ 'menu-dropdown-show': show }" @click="show = !show">
    <slot name="title" />
  </button>
  <ul v-if="show" class="menu-dropdown" :class="{ 'menu-dropdown-show': show }">
    <li v-for="channel in channels" :key="channel.id" class="rounded-box">
      <NuxtLinkLocale class="rounded-box" :to="`/channels/${channel.name}`">
        <slot :channel="channel" name="channel" />
      </NuxtLinkLocale>
    </li>
  </ul>
</template>
