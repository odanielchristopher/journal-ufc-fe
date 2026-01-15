import { useQuery } from '@tanstack/react-query';

import { NEWS_QUERY_KEY } from '@app/config/constants';
import type { INews } from '@app/entities/News';
import { NewsService, newsService } from '@app/services/newsService';

export function useNews(input: NewsService.GetAllParams = {}) {
  const { data, isFetching } = useQuery({
    queryKey: NEWS_QUERY_KEY('get-all'),
    queryFn: () => newsService.getAll(input),
  });

  const map: NewsMap = {
    destaque: {
      data: [],
    },
    extensão: {
      title: 'Extensão Universitária',
      data: [],
    },
    pesquisa: {
      title: 'Pesquisa e Inovação',
      data: [],
    },
    outros: {
      title: 'Outras notícias',
      data: [],
    },
  };

  data?.forEach((news) =>
    map[(news.tag as keyof typeof map) ?? 'outros'].data.push(news),
  );

  return {
    news: map,
    isLoading: isFetching,
  };
}

type NewsMap = {
  destaque: {
    title?: string;
    data: INews[];
  };
  pesquisa: {
    title: string;
    data: INews[];
  };
  extensão: {
    title: string;
    data: INews[];
  };
  outros: {
    title: string;
    data: INews[];
  };
};
