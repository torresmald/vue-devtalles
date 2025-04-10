<template>
  <h1 class="text-2xl font-semibold mb-4">Register</h1>
  <form @submit.prevent="onRegister">
    <!-- Username Input -->
    <div class="mb-4">
      <label for="email" class="block text-gray-600">Email</label>
      <input v-model="form.email" ref="inputEmail" type="email" id="email" name="email"
        class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
        autocomplete="off" />
    </div>

    <!-- Username Input -->
    <div class="mb-4">
      <label for="username" class="block text-gray-600">Username</label>
      <input v-model="form.username" ref="inputUserName" type="text" id="username" name="username"
        class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
        autocomplete="off" />
    </div>
    <!-- Password Input -->
    <div class="mb-4 relative">
      <label for="password" class="block text-gray-600">Password</label>
      <input v-model="form.password" ref="inputPassword" type="password" id="password" name="password"
        class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
        autocomplete="off" />
      <EyeIcon v-if="!isPasswordVisible" class="absolute top-[50%] right-[20px] cursor-pointer"
        @click="onShowPassword('password')" />
      <EyeIconShow v-else class="absolute top-[50%] right-[20px] cursor-pointer" @click="onShowPassword('password')" />


    </div>
    <div class="mb-4 relative">
      <label for="passwordRepeat" class="block text-gray-600">Repeat Password</label>
      <input v-model="form.repeatPassword" ref="inputRepeatPassword" type="password" id="passwordRepeat"
        name="passwordRepeat"
        class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
        autocomplete="off" />
      <EyeIcon v-if="!isRepeatPasswordVisible" class="absolute top-[50%] right-[20px] cursor-pointer"
        @click="onShowPassword('repeatPassword')" />
      <EyeIconShow v-else class="absolute top-[50%] right-[20px] cursor-pointer"
        @click="onShowPassword('repeatPassword')" />
    </div>
    <!-- Remember Me Checkbox -->
    <div class="mb-4 flex items-center">
      <input v-model="form.rememberMe" type="checkbox" id="remember" name="remember" class="text-blue-500" />
      <label for="remember" class="text-gray-600 ml-2">Remember Me</label>
    </div>
    <!-- Forgot Password Link -->
    <div class="mb-6 text-blue-500">
      <a href="#" class="hover:underline">Forgot Password?</a>
    </div>
    <!-- Login Button -->
    <button type="submit"
      class="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full cursor-pointer">
      Register
    </button>
  </form>
  <!-- Sign up  Link -->
  <div class="mt-6 text-blue-500 text-center">
    <RouterLink :to="{ name: 'login' }" class="hover:underline">Login Here</RouterLink>
  </div>
</template>

<script lang='ts' setup>
import EyeIcon from '@/icons/EyeIcon.vue';
import EyeIconShow from '@/icons/EyeIconShow.vue';

import { useAuthStore } from '../store/auth.store';
import { computed, reactive, ref } from 'vue';
import { useToast } from 'vue-toastification';
const inputEmail = ref<HTMLInputElement>()
const inputUserName = ref<HTMLInputElement>()
const inputPassword = ref<HTMLInputElement>()
const inputRepeatPassword = ref<HTMLInputElement>()
const authStore = useAuthStore()
const toast = useToast()
const isPasswordVisible = ref(false)
const isRepeatPasswordVisible = ref(false)

const form = reactive({
  email: '',
  username: '',
  password: '',
  repeatPassword: '',
  rememberMe: false,
})
const optionsToast = {
  timeout: 2000,
  closeOnClick: true,
}

const isSamePassword = computed(() => form.password === form.repeatPassword)

const onShowPassword = (field: string) => {
  if (field === 'password') {
    isPasswordVisible.value = !isPasswordVisible.value
    inputPassword.value!.type = inputPassword.value!.type === 'text' ? 'password' : 'text'
  } else {
    isRepeatPasswordVisible.value = !isRepeatPasswordVisible.value
    inputRepeatPassword.value!.type = inputRepeatPassword.value!.type === 'text' ? 'password' : 'text'
  }
}

const onRegister = async () => {
  if (form.email === '') {
    inputEmail.value?.focus()
    return
  }
  if (form.username === '') {
    inputUserName.value?.focus()
    return
  }
  if (form.password === '') {
    inputPassword.value?.focus()
    return
  }
  if (form.repeatPassword === '') {
    inputRepeatPassword.value?.focus()
    return
  }

  if (!isSamePassword.value) return

  const response = await authStore.register(form.email, form.username, form.password)

  if (!response) {
    form.email = ''
    form.username = ''
    form.password = ''
    form.repeatPassword = ''
    form.rememberMe = false
    toast.error('Usuario o contraseña incorrectos', optionsToast)
  } else {
    toast.success('Gracias por Registrarte', optionsToast)
  }
}

</script>
