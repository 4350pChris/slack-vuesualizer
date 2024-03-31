<script lang="ts" setup>
const toggle = ref<HTMLElement>()

const { properChannels, dms, groups, mpims } = useChannels()
</script>

<template>
  <div
    class="drawer-side lg:border-r border-slate-800/10 dark:border-slate-100/25 pt-16"
  >
    <label ref="toggle" for="drawer" class="drawer-overlay" />
    <aside
      class="h-full bg-base-100 text-base-content w-80 px-2 py-4"
      @click="toggle?.click()"
    >
      <div class="md:hidden mb-4 gap-2" @click.stop>
        <div class="flex justify-center">
          <NavToken />
        </div>
        <div class="flex justify-evenly gap-4">
          <NavLocaleChanger />
          <NavThemeToggle />
        </div>
      </div>
      <NavMenu :channels="properChannels" :dms="dms" :groups="groups" :mpims="mpims" />
      <NavFooter class="mt-8" />
      <div
        class="from-base-100 pointer-events-none sticky bottom-0 flex h-20 bg-gradient-to-t to-transparent"
      />
    </aside>
  </div>
</template>
