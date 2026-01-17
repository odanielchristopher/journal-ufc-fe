import { useMemo } from 'react';

import type { INews } from '@app/entities/News';
import { useNews } from '@app/hooks/useNews';

export type NewsMap = {
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

export function useHomeController() {
  const { news, isLoading } = useNews();

  const map = useMemo(() => {
    const data: NewsMap = {
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

    news?.forEach((news) =>
      data[(news.category as keyof typeof data) ?? 'outros'].data.push(news),
    );

    return data;
  }, [news]);

  return {
    news: map,
    isLoading,
  };
}
