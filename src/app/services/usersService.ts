// @app/services/usersService.ts
import type { AxiosInstance } from 'axios';

import { UserDataMapper } from '@app/datamappers/UserDataMapper';
import type { IUser, IPersistenceUser } from '@app/entities/User';

import { httpClient } from './httpClient';

export class UsersService {
  readonly BASE_ROUTE = '/users';

  constructor(private readonly httpClient: AxiosInstance) {
    this.me.bind(this);
    this.getAll.bind(this);
  }

  async me(): Promise<UsersService.MeOutput> {
    const { data } = await this.httpClient.get<IPersistenceUser>('/me');
    return UserDataMapper.toDomain(data);
  }

  async getAll(params: UsersService.GetAllParams = {}): Promise<IUser[]> {
    const { data } = await this.httpClient.get<IPersistenceUser[]>(
      this.BASE_ROUTE,
      {
        params,
      },
    );

    return data.map((user) => UserDataMapper.toDomain(user));
  }

  async getById({ id }: UsersService.GetByIdParams): Promise<IUser> {
    const { data } = await this.httpClient.get<IPersistenceUser>(
      `${this.BASE_ROUTE}/${id}`,
    );

    return UserDataMapper.toDomain(data);
  }

  async create(params: UsersService.CreateParams): Promise<IUser> {
    const { data } = await this.httpClient.post<IPersistenceUser>(
      this.BASE_ROUTE,
      UserDataMapper.toPersistence(params),
    );

    return UserDataMapper.toDomain(data);
  }

  async update({ id, ...params }: UsersService.UpdateParams): Promise<IUser> {
    const { data } = await this.httpClient.put<IPersistenceUser>(
      `${this.BASE_ROUTE}/${id}`,
      params,
    );

    return UserDataMapper.toDomain(data);
  }

  async remove({ id }: UsersService.RemoveParams): Promise<void> {
    await this.httpClient.delete(`${this.BASE_ROUTE}/${id}`);
  }
}

export namespace UsersService {
  export type MeOutput = IUser;
  
  export type GetAllParams = {
    page?: number;
    perPage?: number;
    query?: string;
  };

  export type GetByIdParams = {
    id: string;
  };

  export type CreateParams = Omit<IUser, 'id'>;

  export type UpdateParams = IUser;

  export type RemoveParams = { id: string };
}

export const usersService = new UsersService(httpClient);