import axiosApi from '@/api/api';
import type { User } from '../interfaces';

interface CheckSuccess {
  ok: boolean,
  user: User,
  token: string
}

interface CheckError {
  ok: boolean,
  message: string
}


export const authStatusAction = async (): Promise<CheckError | CheckSuccess> => {
  try {
    const token = localStorage.getItem('token');
    if (!token) return { ok: false, message: 'No token found' };
    const {data} = await axiosApi.get('/auth/check-status');
    return {
      ok: true,
      user: data.user,
      token: data.token,
    }
  } catch (error) {
    console.error('Error fetching auth status:', error);
    throw new Error('Failed to fetch auth status');
  }
};
