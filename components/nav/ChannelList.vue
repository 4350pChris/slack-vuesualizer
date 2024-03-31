<script lang="ts" setup generic="T extends {id: string, name: string}">
type Props = {
  channels: T[]
}

defineProps<Props>()
</script>

<template>
  <details>
    <summary class="capitalize">
      <slot name="title" />
    </summary>
    <ul>
      <li v-for="channel in channels" :key="channel.id" class="rounded-box">
        <NuxtLinkLocale class="rounded-box" :to="`/channels/${channel.name}`">
          <slot :channel="channel" name="channel" />
        </NuxtLinkLocale>
      </li>
    </ul>
  </details>
</template>
