import type { AxiosInstance } from 'axios';

import type { IUser } from '@app/entities/User';
import type { Role } from '@app/enums/Role';

import { httpClient } from './httpClient';

export class UsersService {
  readonly BASE_ROUTE = '/users';

  constructor(private readonly httpClient: AxiosInstance) {}

  async me(): Promise<UsersService.MeOutput> {
    const { data } = await this.httpClient.get<UsersService.MeOutput>('/users');

    return data;
  }

  async getEditors() {
    const { data } = await this.httpClient.get<IUser[]>('/users/editors');

    return data;
  }

  create = async (input: UsersService.CreateInput) => {
    const { data } = await this.httpClient.post<IUser>('/users', input);

    return data;
  };
}

export namespace UsersService {
  export type MeOutput = IUser;

  export type CreateInput = {
    nickname: string;
    username: string;
    password: string;
    role: Role;
  };
}

export const usersService = new UsersService(httpClient);
