export const getProductsImages = (imageName: string) => {
  return imageName.includes('http')
   ? imageName
   : `${import.meta.env.VITE_BASE_URL_API}/files/product/${imageName}`
}



export const getImagesNames = (images: string[]) => {
  return images.map((image) => {
    if(image.startsWith('http')){
      const imageName = image.split('/').pop();
      return imageName ? image : ''
    }
    return image
  })

}
