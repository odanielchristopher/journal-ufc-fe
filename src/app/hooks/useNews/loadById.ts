import { useQuery } from '@tanstack/react-query';

import { NEWS_QUERY_KEY } from '@app/config/constants';
import type { INews } from '@app/entities/News';
import { NewsService, newsService } from '@app/services/newsService';

import type { UseNewsOutput } from './types';

export function loadById(
  input: NewsService.GetByIdParams,
): UseNewsOutput<INews | undefined> {
  const { data: news, isFetching } = useQuery({
    queryKey: NEWS_QUERY_KEY('get-by-id'),
    queryFn: () => newsService.getById(input),
  });

  return {
    news,
    isLoading: isFetching,
  };
}
