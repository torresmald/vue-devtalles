import type { YesNo } from '@/interfaces/yes-no.interface';

export const yesNoApi = async (): Promise<YesNo> => {
  const response = await fetch('https://yesno.wtf/api');
  const data = await response.json();
  return data;
};
