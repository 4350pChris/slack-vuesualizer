<template>
  <div>
    <NavHeader :simple="true" />
    <main
      class="flex items-center min-h-screen overflow-x-hidden container mx-auto bg-base-100 px-2 md:px-4 pb-2 !pt-16"
    >
      <slot />
    </main>
  </div>
</template>
