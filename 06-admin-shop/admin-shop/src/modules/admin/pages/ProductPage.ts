import CustomInput from '../components/CustomInput.vue';
import CustomTextArea from '../components/CustomTextArea.vue';
import CustomSelect from '../components/CustomSelect.vue';
import { getProductAction } from '@/modules/products/actions/getProduct';
import { useMutation, useQuery } from '@tanstack/vue-query';
import { useFieldArray, useForm } from 'vee-validate';
import { computed, defineComponent, ref, watch, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import * as yup from 'yup';
import { useProductsStore } from '@/modules/products/stores/useProducstStore';
import type { Product } from '@/modules/products/interfaces/product.interface';
import { useToast } from 'vue-toastification';
const validationSchema = yup.object({
  title: yup.string().required(),
  slug: yup.string().required(),
  description: yup.string().required(),
  price: yup.number().required(),
  stock: yup.number().required().min(1),
  gender: yup.string().oneOf(['unisex', 'kid', 'men', 'women']),
});

enum Size {
  L = 'L',
  M = 'M',
  S = 'S',
  Xl = 'XL',
  Xs = 'XS',
  Xxl = 'XXL',
}

export default defineComponent({
  components: { CustomInput, CustomTextArea, CustomSelect },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const router = useRouter();

    const { values, errors, defineField, handleSubmit, resetForm } = useForm({
      validationSchema: validationSchema,
    });

    const productStore = useProductsStore();
    const toast = useToast();

    const allSizes: Size[] = [Size.Xs, Size.S, Size.M, Size.L, Size.Xl, Size.Xxl];

    const [title, titleAttrs] = defineField('title');
    const [slug, slugAttrs] = defineField('slug');
    const [description, descriptionAttrs] = defineField('description');
    const [price, priceAttrs] = defineField('price');
    const [stock, stockAttrs] = defineField('stock');
    const [gender, genderAttrs] = defineField('gender');

    const { fields: images } = useFieldArray<string>('images');
    const { fields: sizes, remove: removeSize, push: pushSize } = useFieldArray<string>('sizes');
    const imagesFiles = ref<File[]>([]);

    const onSubmit = handleSubmit(async (product: Partial<Product>) => {
      const formValue: Partial<Product> = {
        ...product,
        images: [...product?.images, imagesFiles.value],
      };
      mutate(formValue);
    });

    const isValidForm = computed(() => Object.keys(errors.value).length === 0);

    const toggleSize = (size: string) => {
      const currentSizes = sizes.value.map((s) => s.value);
      const hasSize = currentSizes.includes(size);
      if (hasSize) {
        removeSize(currentSizes.indexOf(size));
      } else {
        pushSize(size);
      }
    };

    const onUploadFiles = (event: Event) => {
      const inputFiles = event.target as HTMLInputElement;
      const files = inputFiles.files;
      console.log(files);

      if (!files || files.length === 0) return;
      for (const imageFile of files) {
        imagesFiles.value.push(imageFile);
      }
    };

    const {
      data: updatedProduct,
      isPending,
      mutate,
      isSuccess,
    } = useMutation({
      mutationFn: productStore.updateProduct,
    });

    const {
      data: product,
      isError,
      refetch,
    } = useQuery({
      queryKey: ['product', props.id],
      queryFn: () => productStore.getProductById(props.id),
      retry: false,
    });

    watchEffect(() => {
      if (isError.value) {
        router.replace({ name: 'dashboard' });
      }
    });

    watch(
      product,
      () => {
        if (!product) return;
        resetForm({
          values: product.value,
        });
      },
      {
        immediate: true,
      },
    );

    watch(isSuccess, () => {
      if (!isSuccess.value) return;
      toast.success('Producto Actualizado');
      resetForm({
        values: updatedProduct.value,
      });
      imagesFiles.value = [];
      router.replace(`/admin/product/${updatedProduct.value?.id}`);
    });

    watch(
      () => props.id,
      () => {
        refetch();
      },
    );

    return {
      product,
      values,
      errors,

      title,
      titleAttrs,
      slug,
      slugAttrs,
      description,
      descriptionAttrs,
      price,
      priceAttrs,
      stock,
      stockAttrs,
      gender,
      genderAttrs,
      images,
      sizes,
      isPending,
      imagesFiles,

      //COMPUTED
      allSizes,
      genders: ['unisex', 'men', 'kid', 'women'],
      isValidForm,
      //ACTIONS
      onSubmit,
      toggleSize,
      onUploadFiles,
      hasSize: (size: string) => {
        const currentSizes = sizes.value.map((s) => s.value);
        return currentSizes.includes(size);
      },
      buildImageUrl: (image: Blob) => {
        return URL.createObjectURL(image);
      },
    };
  },
});
