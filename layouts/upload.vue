<template>
  <div>
    <NavHeader :simple="true" />
    <main
      class="flex justify-center min-h-screen container mx-auto bg-base-100 px-2 md:px-4 pb-2 pt-16"
    >
      <slot />
    </main>
  </div>
</template>
