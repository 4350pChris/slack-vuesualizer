<script lang="ts" setup>
import MenuIcon from '~icons/line-md/menu'

interface Props {
  simple?: boolean
}

defineProps<Props>()
</script>

<template>
  <div
    class="h-16 w-full fixed top-0 z-40 lg:border-b border-slate-800/10 dark:border-slate-100/25 text-base-content bg-base-100 flex justify-center"
  >
    <nav class="navbar w-full container mx-auto relative gap-2">
      <div v-if="!simple" class="flex-0 lg:hidden">
        <label for="drawer" class="btn btn-ghost btn-circle" tabindex="0">
          <MenuIcon class="w-6 h-6" />
        </label>
      </div>
      <div class="flex justify-center grow">
        <MessageSearch v-if="!simple" />
      </div>
      <div class="gap-4" :class="{ 'hidden md:flex': !simple }">
        <NavToken />
        <NavLocaleChanger />
        <NavThemeToggle />
        <NavGithubLink simple />
      </div>
    </nav>
  </div>
</template>
