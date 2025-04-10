<template>
  <!-- component -->
  <div class="bg-gray-100 flex justify-center items-center h-screen">
    <!-- Left: Image -->
    <div class="w-1/2 h-screen hidden lg:block">
      <img src="https://placehold.co/800x/667fff/ffffff.png?text=Your+Image&font=Montserrat" alt="Placeholder Image"
        class="object-cover w-full h-full">
    </div>

    <!-- Right: Login/Register -->
    <div class="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
      <RouterView />
      <RouterLink to="/">
        <button type="submit"
        class="bg-green-500 hover:bg-green-600 text-white font-semibold rounded-md py-2 px-4 w-full my-4">Home</button>
      </RouterLink>
    </div>
  </div>
</template>

