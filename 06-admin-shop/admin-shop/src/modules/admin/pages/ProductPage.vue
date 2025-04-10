<template>
  <div>
    <div class="bg-white px-5 py-2 rounded">
      <h1 class="text-3xl">Producto: <small class="text-blue-500">{{ title }}</small></h1>
      <hr class="my-4" />
    </div>

    <form @submit="onSubmit" class="grid grid-cols-1 sm:grid-cols-2 bg-white px-5 gap-5">
      <div class="first-col">
        <!-- Primera parte del formulario -->
        <CustomInput label="Title" v-model="title" v-bind="titleAttrs" :error="errors.title" />
        <CustomInput label="Slug" v-model="slug" v-bind="slugAttrs" :error="errors.slug" />
        <CustomTextArea :label="'Description'" v-model="description" v-bind="descriptionAttrs"
          :error="errors.description" />
        <div class="flex flex-row gap-3">
          <CustomInput class="flex-1" label="Precio" v-model.number="price" v-bind="priceAttrs" :error="errors.price"
            type="number" />
          <CustomInput class="flex-1" label="Stock" v-model.number="stock" v-bind="stockAttrs" :error="errors.stock"
            type="number" />
        </div>

        <div class="mb-4">
          <label for="sizes" class="form-label">Tallas</label>
          <div class="flex gap-2 flex-wrap">
            <button id="sizes" @click="toggleSize(size)" v-for="size in allSizes" :key="size" type="button" :class="['bg-blue-100 p-2 rounded w-14 mr-2 cursor-pointer hover:bg-blue-400', {
              'bg-blue-400': hasSize(size)
            }]">{{ size }}</button>
          </div>
        </div>
      </div>

      <!-- Segunda columna -->
      <div class="first-col">
        <label for="image" class="form-label">Imágenes</label>

        <!-- Contenedor con scroll horizontal -->
        <div class="flex flex-row overflow-x-auto gap-4 p-2 w-full h-[265px] bg-gray-200 rounded items-center">
          <img class="h-full rounded-lg flex-shrink-0 max-w-[250px] object-contain" id="image" :src="image.value"
            v-for="image in images" :key="image.value" :alt="product?.title" />
        </div>

        <!-- Otro contenedor (para imágenes nuevas, por ejemplo) -->
        <div class="flex flex-row overflow-x-auto gap-4 p-2 w-full h-[265px] bg-gray-200 rounded items-center mt-4">
          <img class="h-full rounded-lg flex-shrink-0 max-w-[250px] object-contain" id="image"
            :src="buildImageUrl(image)" v-for="image in imagesFiles" :key="image.name" :alt="product?.title" />
        </div>

        <!-- Upload image -->
        <div class="col-span-2 my-2">
          <label for="image" class="form-label">Subir imagen</label>
          <input @change="onUploadFiles" multiple type="file" id="image" class="form-control" accept="image/*" />
        </div>

        <CustomSelect label="Gender" v-model="gender" :genders="genders" :error="errors.gender" v-bind="genderAttrs" />

        <div class="my-4 text-right">
          <button :disabled="!isValidForm || isPending" type="submit"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-blue-200 disabled:cursor-not-allowed cursor-pointer">
            Guardar
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script lang='ts' src="./ProductPage.ts"></script>
<style scoped>
@reference "tailwindcss";

.form-control {
  @apply shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none;
}

.form-label {
  @apply block text-gray-700 text-sm font-bold mb-2;
}
</style>
