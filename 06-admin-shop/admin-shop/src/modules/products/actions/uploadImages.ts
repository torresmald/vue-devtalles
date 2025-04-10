import axiosApi from '@/api/api';

export const uploadImages = async (images: (string | File)[]) => {
  const flatImages = images.flatMap((img) => (Array.isArray(img) ? img : [img]));
  const filesToUpload = flatImages.filter((image) => image instanceof File) as File[];
  const currentImages = flatImages.filter((image) => typeof image === 'string') as string[];

  const uploadPromises = filesToUpload.map(async (file) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      const { data } = await axiosApi.post<{ secureUrl: string }>('/files/product', formData);
      return data.secureUrl;
    } catch (error) {
      console.log(error);
      throw new Error('Error uploading image');
    }
  });

  const uploadedImages = await Promise.all(uploadPromises);

  return [...currentImages, ...uploadedImages];
};
