<template>
  <form class="mx-auto max-w-2xl">
    <div class="space-y-6">
      <h1 class="text-3xl font-bold">
        <slot name="header" />
      </h1>
      <slot name="main" />
    </div>
  </form>
</template>
