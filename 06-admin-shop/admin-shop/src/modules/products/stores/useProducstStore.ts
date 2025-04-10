import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import type { Product } from '../interfaces/product.interface';
import { getProductAction } from '../actions/getProduct';
import { updateProductsAction } from '../actions';

export const useProductsStore = defineStore('products', () => {
  const products = ref<Product[]>([]);
  const product = ref<Product>();
  const productsList = computed(() => products.value);

  const getProductById = async(id: string): Promise<Product | undefined> => {
    const productStore = await getProductAction(id);
    if(!productStore) return
    product.value = productStore
    return productStore
  };


  const updateProduct = async (newProduct: Partial<Product>) => {
    const productStore = await updateProductsAction(newProduct)
    product.value = productStore
    return productStore
  }


  return {
    //Properties
    productsList,
    product,
    //Computed

    //Actions
    getProductById,
    updateProduct
  };
});
