<script setup lang="ts">
type FormType =
  | 'button'
  | 'checkbox'
  | 'color'
  | 'date'
  | 'datetime-local'
  | 'email'
  | 'file'
  | 'hidden'
  | 'image'
  | 'month'
  | 'number'
  | 'password'
  | 'radio'
  | 'range'
  | 'reset'
  | 'search'
  | 'submit'
  | 'tel'
  | 'text'
  | 'time'
  | 'url'
  | 'week'

const model = defineModel<string | number>()

defineProps<{
  formType: FormType
  label: string
  name: string
}>()
</script>

<template>
  <div>
    <label :for="name" class="block text-sm font-medium leading-6 text-inherit">{{ label }}</label>
    <div
      class="mt-1 block w-full px-3 py-2 border border-gray-800 rounded-md shadow-sm focus-within:ring-2 focus-within:ring-black focus-within:border-black dark:border-white dark:focus-within:ring-white dark:focus-within:border-white sm:text-sm"
    >
      <input
        class="block w-full h-full p-0 border-0 placeholder-gray-500 focus:ring-0 sm:text-sm focus:outline-none dark:bg-black dark:placeholder-gray-300"
        :name="name"
        :id="name"
        v-model="model"
        :type="formType"
        v-bind="$attrs"
      />
    </div>
  </div>
</template>
