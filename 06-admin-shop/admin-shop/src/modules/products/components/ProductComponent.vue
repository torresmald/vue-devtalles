<template>
  <!-- component -->
  <div class="flex flex-col gap-8 min-h-screen items-center justify-center bg-gray-100">
    <div class="flex font-sans">
      <div class="flex-none w-48 relative">
        <img :src="store.product?.images[0]" alt="" class="absolute inset-0 w-full h-full object-cover"
          loading="lazy" />
      </div>
      <div class="flex-auto p-6">
        <div class="flex flex-wrap">

          <div class="text-lg font-semibold text-black-500">
            <h1 class="flex-auto text-2xl font-semibold text-gray-900 w-[500px] truncate">
              {{ store.product?.title }}
            </h1>
            <p class="text-xl text-red-400">
              {{ store.product?.price }}€
              <span class="text-sm text-black line-through">{{ store.product?.price + 20 }}€</span>
            </p>

          </div>
          <div class="w-full flex-none text-sm font-medium text-black-700 mt-2 uppercase">
            {{ store.product?.gender }}
          </div>
        </div>
        <div class="flex items-baseline mt-4 mb-6 pb-6 border-b border-slate-200">
          <div class="space-x-2 flex text-sm">
            <label v-for="size in store.product?.sizes" :key="size" class="cursor-pointer">
              <input class="sr-only peer" name="size" type="radio" :value="size" v-model="selectedSize"
                @change="onChangeChecked(size)" />
              <div
                class="w-9 h-9 rounded-lg flex items-center justify-center text-slate-700 peer-checked:font-semibold peer-checked:bg-slate-900 peer-checked:text-white">
                {{ size }}
              </div>
            </label>
          </div>
        </div>
        <div class="flex space-x-4 mb-6 text-sm font-medium">
          <div class="flex-auto flex space-x-4">
            <button
              class="h-10 px-6 font-semibold rounded-md border border-balck-800 text-gray-900 cursor-pointer hover:text-white hover:bg-black"
              type="button">
              Add to cart
            </button>
          </div>
          <button
            class="flex-none flex items-center justify-center w-9 h-9 rounded-md text-slate-300 border border-slate-200"
            type="button" aria-label="Favorites">
            <svg width="20" height="20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" clip-rule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
            </svg>
          </button>
        </div>
        <p class="text-sm text-slate-700">
          Free shipping
        </p>
      </div>
    </div>
    <RouterLink to="/">
      <button
        class="h-10 px-6 font-semibold rounded-md border bg-black text-white cursor-pointer hover:text-black hover:bg-white"
        type="button">
        Return
      </button>
    </RouterLink>

  </div>
</template>
<script lang='ts' setup>

import { computed, ref, watch } from 'vue';
import { useProductsStore } from '../stores/useProducstStore';
import { useRoute } from 'vue-router';
const store = useProductsStore()
const route = useRoute()
const id = (computed(() => route.params.id))
const selectedSize = ref('M') // Talla por defecto seleccionada

const onChangeChecked = (size: string) => {
  selectedSize.value = size
}

watch(id, async (newId) => {
  const newIdString = String(newId);
  store.product = await store.getProductById(newIdString);
}, { immediate: true });

</script>
