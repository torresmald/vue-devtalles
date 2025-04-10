import axiosApi from '@/api/api';
import type { Product } from '../interfaces/product.interface';
import { getImagesNames } from './getProducstImages';
import { uploadImages } from './uploadImages';

export const updateProductsAction = async (product: Partial<Product>) => {
  const id = product.id!;
  if (product.id && product.id !== '') {
    return updateProduct(id, product);
  }
  return createProduct(product);
};

const updateProduct = async (id: string, product: Partial<Product>) => {
  const newImages = await uploadImages(product.images ?? []);
  product.images = newImages;
  prepareProduct(product);
  try {
    const { data } = await axiosApi.patch<Product>(`/products/${id}`, product);
    return data;
  } catch (error) {
    console.log(error);
    throw new Error('Cant update product');
  }
};

const createProduct = async (product: Partial<Product>) => {
  prepareProduct(product);
  try {
    const { data } = await axiosApi.post<Product>(`/products`, product);
    return data;
  } catch (error) {
    console.log(error);
    throw new Error('Cant create product');
  }
};

const prepareProduct = (product: Partial<Product>) => {
  const images = getImagesNames(product.images!);
  delete product.id;
  delete product.user;
  product.images = images;

  return product;
};
