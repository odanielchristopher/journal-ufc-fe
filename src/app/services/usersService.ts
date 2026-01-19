import type { AxiosInstance } from 'axios';

import type { IUser } from '@app/entities/User';
import type { Role } from '@app/enums/Role';

import { httpClient } from './httpClient';

export class UsersService {
  readonly BASE_ROUTE = '/users';

  me = async (): Promise<UsersService.MeOutput> => {
    const { data } = await this.httpClient.get<UsersService.MeOutput>('/users');

    return data;
  };

  getEditors = async () => {
    const { data } = await this.httpClient.get<IUser[]>('/users/editors');

    return data;
  };

  create = async (input: UsersService.CreateInput) => {
    const { data } = await this.httpClient.post<IUser>('/users', input);

    return data;
  };

  update = async (input: UsersService.UpdateInput) => {
    const { data } = await this.httpClient.put<IUser>('/users', input);

    return data;
  };

  remove = async (input: UsersService.RemoveInput) => {
    await this.httpClient.delete(`/users/${input.id}`);
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

  export type UpdateInput = {
    id: number;
    nickname: string;
    username: string;
    password: string;
    role: Role;
  };

  export type RemoveInput = {
    id: number;
  };
}

export const usersService = new UsersService(httpClient);