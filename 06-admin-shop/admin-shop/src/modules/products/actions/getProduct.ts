import axiosApi from '@/api/api';
import type { Product } from '../interfaces/product.interface';
import { getProductsImages } from './getProducstImages';

export const getProductAction = async (id: string): Promise<Product | undefined> => {
  if (id === 'create')
    return {
      id: '',
      tags: [],
      title: '',
      price: 0,
      stock: 0,
      sizes: [],
      gender: [] as any,
      description: '',
      slug: '',
      images: [],
      user: [] as any,
    };

  try {
    const { data } = await axiosApi.get<Product>(`/products/${id}`);
    return {
      ...data,
      images: data.images.map((image) => getProductsImages(image)),
    };
  } catch (error) {
    console.log(error);
  }
};
