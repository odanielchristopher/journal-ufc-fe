import type { INews } from '@app/entities/News';
import { NewsService } from '@app/services/newsService';

import { loadAll } from './loadAll';
import { loadById } from './loadById';
import type { UseNewsOutput } from './types';

export function useNews(
  input: NewsService.GetByIdParams,
): UseNewsOutput<INews | undefined>;
export function useNews(
  input?: NewsService.GetAllParams,
): UseNewsOutput<INews[]>;

export function useNews(
  input: NewsService.GetAllParams | NewsService.GetByIdParams = {},
) {
  if ('id' in input) {
    return loadById(input);
  }

  return loadAll(input);
}
