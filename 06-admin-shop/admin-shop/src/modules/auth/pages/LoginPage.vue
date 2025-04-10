<template>
  <h1 class="text-2xl font-semibold mb-4">Login</h1>
  <form @submit.prevent="onLogin">
    <!-- Username Input -->
    <div class="mb-4">
      <label for="Email" class="block text-gray-600">Email</label>
      <input ref="emailRef" type="text" id="Email" name="Email"
        class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
        autocomplete="off" v-model="form.email" />
    </div>
    <!-- Password Input -->
    <div class="mb-4 relative">
      <label for="password" class="block text-gray-600">Password</label>
      <input ref="passwordRef" type="password" id="password" name="password"
        class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
        autocomplete="off" v-model="form.password" />
      <EyeIcon v-if="!isPasswordVisible" class="absolute top-[50%] right-[20px] cursor-pointer"
        @click="onShowPassword(passwordRef!)" />
      <EyeIconShow v-else class="absolute top-[50%] right-[20px] cursor-pointer"
        @click="onShowPassword(passwordRef!)" />

    </div>
    <!-- Remember Me Checkbox -->
    <div class="mb-4 flex items-center">
      <input v-model="form.rememberMe" :checked="form.rememberMe" type="checkbox" id="remember" name="remember"
        class="text-blue-500" />
      <label for="remember" class="text-gray-600 ml-2">Remember Me</label>
    </div>
    <!-- Forgot Password Link -->
    <div class="mb-6 text-blue-500">
      <a href="#" class="hover:underline">Forgot Password?</a>
    </div>
    <!-- Login Button -->
    <button type="submit"
      class="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full cursor-pointer">
      Login
    </button>
  </form>
  <!-- Sign up  Link -->
  <div class="mt-6 text-blue-500 text-center">
    <RouterLink :to="{ name: 'register' }" class="hover:underline">Sign up Here</RouterLink>
  </div>
</template>

<script lang="ts" setup>
import EyeIcon from '@/icons/EyeIcon.vue';
import EyeIconShow from '@/icons/EyeIconShow.vue';
import { reactive, ref } from 'vue';
import { useAuthStore } from '../store/auth.store';
import { useToast } from 'vue-toastification';
const form = reactive({
  email: '',
  password: '',
  rememberMe: false
})

const authStore = useAuthStore()
const toast = useToast()

const emailRef = ref<HTMLInputElement>()
const passwordRef = ref<HTMLInputElement>()
const isPasswordVisible = ref(false)

const optionsToast = {
  timeout: 2000,
  closeOnClick: true,
}


const onShowPassword = (field: HTMLInputElement) => {
  isPasswordVisible.value = !isPasswordVisible.value

  passwordRef.value!.type = field.type === 'password' ? 'text' : 'password'
}

const onLogin = async () => {
  if (form.email === '') {
    emailRef.value?.focus()
    return
  }
  if (form.password === '') {
    passwordRef.value?.focus()
    return
  }

  const response = await authStore.login(form.email, form.password)
  if (!response) {
    form.email = ''
    form.password = ''
    form.rememberMe = false
    toast.error('Usuario o contraseña incorrectos', optionsToast)
  } else {
    toast.success(`Bienvenido ${form.email}`, optionsToast)

  }
  if (form.rememberMe) {
    console.log(response, 'Entroa qui');

    localStorage.setItem('email', form.email)
  } else {
    localStorage.removeItem('email')
  }
};
</script>
