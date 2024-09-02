<script setup lang="ts">
const { isLoading } = defineProps<{ isLoading: boolean }>()
</script>

<template>
  <transition name="fade" appear>
    <div v-if="isLoading" class="loader absolute m-auto inset-x-0 inset-y-0" />
    <slot v-else></slot>
  </transition>
</template>

<style lang="css" scoped>
/* HTML: <div class="loader"></div> */
.loader {
  width: 50px;
  aspect-ratio: 1;
  border: 2px solid;
  box-sizing: border-box;
  border-radius: 50%;
  display: grid;
  animation: l11 1.5s infinite linear;
  transform-origin: 50% 80%;
}
.loader:before,
.loader:after {
  content: '';
  grid-area: 1/1;
  border: inherit;
  border-radius: 50%;
  animation: inherit;
  animation-duration: 1s;
  transform-origin: inherit;
}
.loader:after {
  --s: -1;
}
@keyframes l11 {
  100% {
    transform: rotate(calc(var(--s, 1) * 1turn));
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
