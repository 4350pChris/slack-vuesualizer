<template>
  <div class="bg-base-200 drawer drawer-mobile">
    <input id="drawer" class="drawer-toggle" type="checkbox" />
    <main class="drawer-content flex flex-col">
      <NavHeader />
      <slot />
    </main>
    <SideDrawer />
  </div>
</template>
