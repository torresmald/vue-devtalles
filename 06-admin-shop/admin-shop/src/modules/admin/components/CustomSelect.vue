<template>
  <div class="mb-4">
    <label :for="label" class="form-label block mb-1">{{ label }}</label>
    <select
      :id="label"
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLSelectElement)?.value)"
      @blur="$emit('blur')"
      class="form-control uppercase w-full p-2 border rounded-md"
      :class="{ 'border-red-500': error }"
    >
      <option value="">-- Seleccione --</option>
      <option v-for="gender in genders" :key="gender" :value="gender">
        {{ gender }}
      </option>
    </select>

    <p v-if="error" class="text-red-500 text-sm mt-1">{{ error }}</p>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  label: string
  modelValue?: string
  genders: string[]
  error?: string
}>()
</script>

<style scoped>
@reference "tailwindcss";

.form-control {
  @apply shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none;
}

.form-label {
  @apply block text-gray-700 text-sm font-bold mb-2;
}
</style>
