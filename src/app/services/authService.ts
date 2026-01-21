import type { AxiosInstance } from 'axios';

import {
  AuthDataMapper,
  type IDomainAuth,
  type IPersistenceAuth,
} from '@app/datamappers/AuthDataMapper';

import { httpClient } from './httpClient';

class AuthService {
  constructor(private readonly httpClient: AxiosInstance) {}

  signin = async ({
    username,
    password,
  }: AuthService.SignInInput): Promise<AuthService.SignInOutPut> => {
    const { data } = await this.httpClient.post<IPersistenceAuth>(
      '/auth/login',
      {
        email: username,
        password,
      },
    );

    return AuthDataMapper.toDomain(data);
  };
}

export const authService = new AuthService(httpClient);

export namespace AuthService {
  export type SignInInput = {
    username: string;
    password: string;
  };

  export type SignInOutPut = IDomainAuth;
}
