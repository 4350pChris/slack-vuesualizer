<template>
  <div class="flex flex-col h-screen bg-base-100">
    <NavHeader :simple="true" />
    <main class="p-6 flex-1 flex flex-col items-center">
      <slot />
    </main>
  </div>
</template>
