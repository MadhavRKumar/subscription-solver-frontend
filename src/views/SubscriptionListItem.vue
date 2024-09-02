<script setup lang="ts">
import type { Subscription } from '@/types'
defineProps<{
  subscription: Subscription
}>()
</script>

<template>
  <li
    class="cursor-pointer text-center p-3 border-2 rounded border-black hover:bg-black hover:text-white focus:bg-black focus:text-white dark:bg-black dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-black dark:focus:bg-white dark:focus:text-black active:scale-95 transition-all"
    @click="$emit('select', subscription.uuid)"
    @keydown.enter="$emit('select', subscription.uuid)"
    tabindex="0"
  >
    <p class="text-lg font-bold">{{ subscription.name }}</p>
    <p>Cost: {{ subscription.cost }}</p>
    <p>Profile Limit: {{ subscription.profileLimit }}</p>
  </li>
</template>
