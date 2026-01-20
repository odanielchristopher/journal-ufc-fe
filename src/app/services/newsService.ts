import type { AxiosInstance } from 'axios';

import { NewsDataMapper } from '@app/datamappers/NewsDataMapper';
import type { INews, IPersistenceNews } from '@app/entities/News';
import type { Category } from '@app/enums/Category';
import { Order } from '@app/enums/Order';

import { httpClient } from './httpClient';

export class NewsService {
  readonly BASE_ROUTE = '/news';

  constructor(private readonly httpClient: AxiosInstance) {}

  getAll = async ({
    order = Order.DESC,
    category,
  }: NewsService.GetAllParams = {}) => {
    const { data } = await this.httpClient.get<IPersistenceNews[]>(
      this.BASE_ROUTE,
      {
        params: {
          category,
          ...(order && {
            _sort: 'publicationDate',
            _order: order === Order.DESC ? 'desc' : 'asc',
          }),
        },
      },
    );

    return data.map((news) => NewsDataMapper.toDomain(news));
  };

  getById = async ({ id }: NewsService.GetByIdParams) => {
    const { data } = await this.httpClient.get<IPersistenceNews>(
      `${this.BASE_ROUTE}/${id}`,
    );

    return NewsDataMapper.toDomain(data);
  };

  create = async (params: NewsService.CreateParams) => {
    const { data } = await this.httpClient.post<IPersistenceNews>(
      this.BASE_ROUTE,
      NewsDataMapper.toCreate(params),
    );

    return NewsDataMapper.toDomain(data);
  };

  update = async ({ id, ...params }: NewsService.UpdateParams) => {
    const { data } = await this.httpClient.put<IPersistenceNews>(
      `${this.BASE_ROUTE}/${id}`,
      NewsDataMapper.toUpdate(params),
    );

    return NewsDataMapper.toDomain(data);
  };

  remove = async ({ id }: NewsService.RemoveParams) => {
    await this.httpClient.delete(`${this.BASE_ROUTE}/${id}`);
  };
}

export namespace NewsService {
  export type GetAllParams = {
    order?: Order;
    category?: Category;
  };

  export type GetByIdParams = {
    id: string;
  };

  export type CreateParams = Omit<INews, 'id' | 'editor'>;

  export type UpdateParams = Omit<INews, 'editor' | 'publishedDate'>;

  export type RemoveParams = { id: string };
}

export const newsService = new NewsService(httpClient);
