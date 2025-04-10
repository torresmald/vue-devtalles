import axiosApi from '@/api/api';
import type { ApiUser } from '../interfaces/ApiUser.interface';
import { isAxiosError } from 'axios';
import type { User } from '../interfaces';

interface LoginSuccess {
  ok: boolean,
  user: User,
  token: string
}

interface LoginError {
  ok: boolean,
  message: string
}



export const loginAction = async (
  email: string,
  password: string,
): Promise<LoginError | LoginSuccess> => {
  try {
    const { data } = await axiosApi.post<ApiUser>('/auth/login', {
      email,
      password,
    });

    return {
      ok: true,
      user: data.user,
      token: data.token,
    };
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 401) {
      return {
        ok: false,
        message: 'Usuario o contraseña incorrectos',
      };
    }
    throw new Error('No se pudo realizar la petición');
  }
};
