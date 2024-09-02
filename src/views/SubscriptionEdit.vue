<script setup lang="ts">
import MyButton from '@/components/MyButton.vue'
import MyForm from '@/components/MyForm.vue'
import MyInput from '@/components/MyInput.vue'
import MyLoader from '@/components/MyLoader.vue'
import { watch, ref } from 'vue'
import type { Subscription } from '@/types'

const props = defineProps<{
  subscription: Subscription
  loading: boolean
}>()

const initialName = ref('')

watch(
  () => props.subscription,
  (subscription) => {
    initialName.value = subscription.name
  }
)
</script>

<template>
  <main>
    <MyLoader :is-loading="loading">
      <section>
        <MyForm>
          <template #header>Edit {{ initialName }}</template>
          <template #main>
            <MyInput
              label="Name"
              name="subscription-name"
              placeholder="Subscription Name"
              formType="text"
              v-model="subscription.name"
            />
            <MyInput
              label="Cost"
              name="cost"
              placeholder="Cost"
              formType="number"
              v-model="subscription.cost"
              :step="1"
            />
            <MyInput
              label="Profile Limit"
              name="profile-limit"
              placeholder="Profile Limit"
              formType="number"
              v-model="subscription.profileLimit"
              :step="1"
            />
            <div class="flex space-x-4">
              <MyButton @click="$emit('update', subscription)">Save</MyButton>
              <MyButton @click="$emit('delete', subscription.uuid)">Delete</MyButton>
            </div>
          </template>
        </MyForm>
      </section>
    </MyLoader>
  </main>
</template>
