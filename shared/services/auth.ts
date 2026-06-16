import { User } from '@prisma/client';
import { axiosInstance } from './instance';

export type GetMeResponse = Pick<User, 'fullName' | 'email'> & {
  phone: string | null;
};

export const getMe = async () => {
  const { data } = await axiosInstance.get<GetMeResponse>('/auth/me');

  return data;
};
