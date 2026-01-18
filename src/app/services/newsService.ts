import type { AxiosInstance } from 'axios';

import { NewsDataMapper } from '@app/datamappers/NewsDataMapper';
import type { INews, IPersistenceNews } from '@app/entities/News';

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

  async getAll(params: NewsService.GetAllParams = {}) {
    const { data } = await this.httpClient.get<IPersistenceNews[]>(
      this.BASE_ROUTE,
      {
        params,
      },
    );

    return data.map((news) => NewsDataMapper.toDomain(news));
  }

  async getById({ id }: NewsService.GetByIdParams) {
    const { data } = await this.httpClient.get<IPersistenceNews>(
      `${this.BASE_ROUTE}/${id}`,
    );

    return NewsDataMapper.toDomain(data);
  }

  async create(params: NewsService.CreateParams) {
    const { data } = await this.httpClient.post<IPersistenceNews>(
      this.BASE_ROUTE,
      NewsDataMapper.toPersistence(params),
    );

    return NewsDataMapper.toDomain(data);
  }

  async update({ id, ...params }: NewsService.UpdateParams) {
    const { data } = await this.httpClient.put<IPersistenceNews>(
      `${this.BASE_ROUTE}/${id}`,
      params,
    );

    return NewsDataMapper.toDomain(data);
  }

  async remove({ id }: NewsService.RemoveParams) {
    await this.httpClient.delete(`${this.BASE_ROUTE}/${id}`);
  }
}

export namespace NewsService {
  export type GetAllParams = {
    page?: number;
    perPage?: number;
    query?: string;
  };

  export type GetByIdParams = {
    id: string;
  };

  export type CreateParams = Omit<INews, 'id'>;

  export type UpdateParams = INews;

  export type RemoveParams = { id: string };
}

export const newsService = new NewsService(httpClient);
