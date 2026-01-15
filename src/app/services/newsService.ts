import type { AxiosInstance } from 'axios';

import type { INews } from '@app/entities/News';

import { httpClient } from './httpClient';

export class NewsService {
  readonly BASE_ROUTE = '/news';

  constructor(private readonly httpClient: AxiosInstance) {}

  getAll = async (input: NewsService.GetAllParams = {}) => {
    const { data } = await this.httpClient.get<INews[]>(this.BASE_ROUTE, {
      params: input,
    });

    return data;
  };

  getById = async () => {};
  create = async () => {};
  update = async () => {};
  remove = async () => {};
}

export namespace NewsService {
  export type GetAllParams = {
    page?: number;
    perPage?: number;
    query?: string;
  };
}

export const newsService = new NewsService(httpClient);
