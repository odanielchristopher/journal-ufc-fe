import type { AxiosInstance } from 'axios';

import { httpClient } from './httpClient';

class AuthService {
  constructor(private readonly httpClient: AxiosInstance) {}

  signin = async ({
    email,
    password,
  }: AuthService.SignInInput): Promise<AuthService.SignInOutPut> => {
    console.log('Usuário logado: ', { email, password });
    const {
      data: { accessToken, refreshToken },
    } = await this.httpClient.get<AuthService.SignInOutPut>('/sign-in');

    return {
      accessToken,
      refreshToken,
    };
  };

  refreshToken = async (refreshTokenId: string) => {
    const {
      data: { accessToken, refreshToken },
    } = await httpClient.post<AuthService.SignInOutPut>('/auth/refresh-token', {
      refreshToken: refreshTokenId,
    });

    return {
      accessToken,
      refreshToken,
    };
  };
}

export const authService = new AuthService(httpClient);

export namespace AuthService {
  export type SignInInput = {
    email: string;
    password: string;
  };

  export type SignInOutPut = {
    accessToken: string;
    refreshToken: string;
  };
}
