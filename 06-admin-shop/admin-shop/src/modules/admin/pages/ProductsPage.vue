<template>
  <div class="bg-white px-5 py-2 rounded">
    <h1 class="text-3xl">Products</h1>
    <div class="py-8 w-full">
      <div class="shadow overflow-hidden rounded border-b border-gray-200 min-h-[1885px]">
        <table class="min-w-full bg-white">
          <thead class="bg-gray-800 text-white">
            <tr>
              <th class="w-50 text-left py-3 px-4 uppercase font-semibold text-sm">Image</th>
              <th class="flex-1 text-left py-3 px-4 uppercase font-semibold text-sm">Title</th>
              <th class="text-left py-3 px-4 uppercase font-semibold text-sm">Price</th>
              <th class="text-left py-3 px-4 uppercase font-semibold text-sm">Size</th>
            </tr>
          </thead>
          <tbody class="text-gray-700">
            <tr v-for="({title, price, sizes, images, id}, index) in products" :key="id" :class="index % 2 === 0 ? 'bg-gray-200' : ''" >
              <td class=" text-left py-3 px-4">
                <RouterLink :to="`/admin/product/${id}`">
                  <img :src="images[0]" :alt="title" class="w-40 h-40 object-cover rounded">
                </RouterLink>
              </td>
              <td class=" text-left py-3 px-4">
                <RouterLink class="cursor-pointer hover:font-bold" :to="`/admin/product/${id}`">{{ title }}</RouterLink>
              </td>
              <td class="text-left py-3 px-4">{{ price }}€</td>
              <td class="text-left py-3 px-4">
                <span v-for="size in sizes" :key="size" class="inline-block bg-gray-300 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 mt-1">
                  {{ size }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <ButtonsPagination :page="page" :has-more-page="!!products && products.length < 10"/>
    </div>
  </div>
</template>
<script lang='ts' setup>
import { getProducts } from '@/modules/products/actions/getProducts';
import { useQuery, useQueryClient } from '@tanstack/vue-query'
import { ref, watch } from 'vue';
import { useRoute} from 'vue-router';
import ButtonsPagination from '@/modules/common/components/ButtonsPagination.vue';

const route = useRoute()
const queryClient = useQueryClient()
const page = ref(Number(route.query.page || 1))

const { data: products } = useQuery({
  queryKey: ['products', { page: page }],
  queryFn: () => getProducts(page.value),
})

watch(() => route.query.page, (newPage) => {
  page.value = Number(newPage)
  window.scrollTo({top: 0, behavior: 'smooth'})
})

watch(page, () => {
  queryClient.prefetchQuery({
    queryKey: ['products',  {page: page.value + 1}],
    queryFn: () => getProducts(page.value + 1),
  })
}, { immediate: true })


</script>

