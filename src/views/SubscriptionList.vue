<script setup lang="ts">
import MyLoader from '@/components/MyLoader.vue'
import SubscriptionListItem from './SubscriptionListItem.vue'
import type { Subscription } from '@/types'
defineProps<{
  subscriptions: Subscription[]
  loading: boolean
}>()
</script>

<template>
  <main>
    <MyLoader :is-loading="loading">
      <section class="px-3">
        <ul class="grid grid-cols-3 gap-5">
          <SubscriptionListItem
            v-for="subscription in subscriptions"
            :key="subscription.uuid"
            :subscription="subscription"
            @select="$emit('edit', subscription.uuid)"
          />
        </ul>
      </section>
    </MyLoader>
  </main>
</template>
