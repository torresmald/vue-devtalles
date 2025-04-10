import axiosApi from '@/api/api';
import type { User } from '../interfaces';
import { isAxiosError } from 'axios';

interface LoginSuccess {
  ok: boolean;
  user: User;
  token: string;
}

interface LoginError {
  ok: boolean;
  message: string;
}

export const registerAction = async (
  email: string,
  fullName: string,
  password: string,
): Promise<LoginError | LoginSuccess> => {
  try {
    const { data } = await axiosApi.post('/auth/register', { email, fullName, password });

    return {
      ok: true,
      user: data.user,
      token: data.token,
    };
  } catch (error) {
    console.log(error);
    if (isAxiosError(error) && error.response?.status === 400) {
      return {
        ok: false,
        message: error.message,
      };
    }
    throw new Error('No se pudo realizar la petición');
  }
};
