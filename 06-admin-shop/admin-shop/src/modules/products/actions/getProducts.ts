import axiosApi from '@/api/api';
import type { Product } from '../interfaces/product.interface';
import { getProductsImages } from './getProducstImages';

export const getProducts = async (page: number) => {
  try {
    const {data} = await axiosApi.get<Product[]>(`/products?offset=${page * 10}`);
    const dataMapped =  data.map(product => ({
      ...product,
      images: product.images.map((image:string) => getProductsImages(image))
    }))
    return dataMapped
  } catch (error) {
    console.log(error);
  }
};



