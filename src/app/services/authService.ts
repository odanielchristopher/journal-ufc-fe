import type { AxiosInstance } from 'axios';

import { httpClient } from './httpClient';

class AuthService {
  constructor(private readonly httpClient: AxiosInstance) {}

  signin = async ({
    email,
    password,
  }: AuthService.SignInInput): Promise<AuthService.SignInOutPut> => {
    const {
      data: { accessToken, refreshToken },
    } = await this.httpClient.post<AuthService.SignInOutPut>('/auth/sign-in', {
      email,
      password,
    });

    return {
      accessToken,
      refreshToken,
    };
  };

  signup = async ({
    user,
  }: AuthService.SignUpInput): Promise<AuthService.SignUpOutPut> => {
    const {
      data: { accessToken, refreshToken },
    } = await this.httpClient.post<AuthService.SignUpOutPut>('/auth/sign-up', {
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        age: user.age,
        email: user.email,
        password: user.password,
      },
    });

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

  export type SignUpInput = {
    user: {
      avatar?: File;
      firstName: string;
      lastName: string;
      age: number;
      email: string;
      password: string;
    };
  };

  export type SignUpOutPut = {
    accessToken: string;
    refreshToken: string;
  };
}
