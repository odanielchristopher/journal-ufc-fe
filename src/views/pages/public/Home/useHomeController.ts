import { useMemo } from 'react';

import type { INews } from '@app/entities/News';
import type { Category } from '@app/enums/Category';
import { Order } from '@app/enums/Order';
import { useNews } from '@app/hooks/useNews';

export type NewsMap = Record<Category, { title?: string; data: INews[] }>;

export function useHomeController() {
  const { news, isLoading } = useNews({
    order: Order.DESC,
  });

  const map = useMemo(() => {
    const data: NewsMap = {
      DESTAQUE: {
        data: [],
      },
      EXTENSAO: {
        title: 'Extensão Universitária',
        data: [],
      },
      PESQUISA: {
        title: 'Pesquisa e Inovação',
        data: [],
      },
      COMUNIDADE: {
        title: 'Comunidade',
        data: [],
      },
      ENSINO: {
        title: 'Ensino e Tecnologia',
        data: [],
      },
      EVENTOS: {
        title: 'Eventos disponíveis',
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
