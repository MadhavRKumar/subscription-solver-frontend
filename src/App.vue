<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, RouterView, useRouter, useRoute } from 'vue-router'
import DarkModeToggle from '@/components/DarkModeToggle.vue'
import useSubscription from '@/composables/api'

const router = useRouter()
const route = useRoute()

const uuid = computed(() => route.params.uuid)

const { useGet, update, remove, create, subscriptions, loading } = useSubscription()

const { subscription } = useGet(uuid)

function createSubscription(subscription: any) {
  create(subscription).then((newSubscription) => {
    router.push({ name: 'edit', params: { uuid: newSubscription.uuid } })
  })
}

function deleteSubscription(uuid: string) {
  remove(uuid)
  router.push({ name: 'list' })
}

function goToEdit(uuid: string) {
  router.push({ name: 'edit', params: { uuid } })
}
</script>

<template>
  <div class="h-screen bg-white text-black dark:bg-black dark:text-white">
    <header class="py-6 border-b-4 border-black dark:bg-black dark:border-white mb-6">
      <nav class="flex">
        <RouterLink
          class="mx-6 hover:underline text-xl"
          :to="{ name: 'list' }"
          active-class="underline decoration-2 font-bold"
          >List</RouterLink
        >
        <RouterLink
          class="mx-6 hover:underline text-xl"
          :to="{ name: 'new' }"
          active-class="underline decoration-2 font-bold"
          >New</RouterLink
        >
        <DarkModeToggle class="ml-auto mr-6" />
      </nav>
    </header>

    <RouterView
      @create="createSubscription"
      :subscription="subscription"
      :subscriptions="subscriptions"
      :loading="loading"
      @update="update"
      @delete="deleteSubscription"
      @edit="goToEdit"
    />
  </div>
</template>
