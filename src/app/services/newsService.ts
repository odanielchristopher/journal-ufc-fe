import type { AxiosInstance } from 'axios';

import type { INews } from '@app/entities/News';

import { httpClient } from './httpClient';

export class NewsService {
  readonly BASE_ROUTE = '/news';

  constructor(private readonly httpClient: AxiosInstance) {
    this.getAll.bind(this);
    this.getById.bind(this);
    this.create.bind(this);
    this.update.bind(this);
    this.remove.bind(this);
  }

  async getAll(input: NewsService.GetAllParams = {}) {
    const { data } = await this.httpClient.get<INews[]>(this.BASE_ROUTE, {
      params: input,
    });

    return data;
  }

  async getById() {}
  async create() {}
  async update() {}
  async remove() {}
}

export namespace NewsService {
  export type GetAllParams = {
    page?: number;
    perPage?: number;
    query?: string;
  };
}

export const newsService = new NewsService(httpClient);
