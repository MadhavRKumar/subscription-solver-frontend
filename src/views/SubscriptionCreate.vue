<script setup lang="ts">
import { ref, computed } from 'vue'
import MyButton from '@/components/MyButton.vue'
import MyForm from '@/components/MyForm.vue'
import MyInput from '@/components/MyInput.vue'
import type { Subscription } from '@/types'

const emit = defineEmits<{
  create: [subscription: Subscription]
}>()

const subscription = ref<Subscription>({
  uuid: '',
  name: '',
  profileLimit: 0,
  cost: 0
})

const createDisabled = computed(() => {
  return !subscription.value.name || !subscription.value.profileLimit || !subscription.value.cost
})
</script>

<template>
  <main>
    <section>
      <MyForm>
        <template #header>Create</template>
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

          <MyButton @click="$emit('create', subscription)" :disabled="createDisabled"
            >Create</MyButton
          >
        </template>
      </MyForm>
    </section>
  </main>
</template>

<style scoped>
/* code... */
</style>
