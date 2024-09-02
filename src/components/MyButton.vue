<script setup lang="ts">
// code...
</script>

<template>
  <button
    class="rounded p-2 border border-black border-2 font-bold disabled:bg-gray-100 disabled:border-gray-400 disabled:text-gray-400 enabled:hover:scale-110 enabled:active:scale-90 dark:border-white transition-all"
    type="button"
  >
    <slot />
  </button>
</template>
