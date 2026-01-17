import { useQuery } from '@tanstack/react-query';

import { NEWS_QUERY_KEY } from '@app/config/constants';
import type { INews } from '@app/entities/News';
import { NewsService, newsService } from '@app/services/newsService';

import type { UseNewsOutput } from './types';

export function loadAll(
  input: NewsService.GetAllParams,
): UseNewsOutput<INews[]> {
  const { data, isFetching } = useQuery({
    queryKey: NEWS_QUERY_KEY('get-all'),
    queryFn: () => newsService.getAll(input),
  });

  return {
    news: data ?? [],
    isLoading: isFetching,
  };
}
