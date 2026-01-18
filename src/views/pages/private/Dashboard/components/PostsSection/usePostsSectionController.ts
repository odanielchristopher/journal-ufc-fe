import { useCallback, useMemo, useState } from 'react';

import type { INews } from '@app/entities/News';
import type { Category } from '@app/enums/Category';
import type { Order } from '@app/enums/Order';
import { useNews } from '@app/hooks/useNews';
import { normalizeText } from '@app/utils/normalizeText';

export function usePostsSectionController() {
  const [category, setCategory] = useState<Category | null>(null);
  const [order, setOrder] = useState<Order | null>(null);
  const [search, setSearch] = useState('');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [postToEdit, setPostToEdit] = useState<INews | null>(null);

  const { isLoading, news } = useNews({
    category: category ?? undefined,
    order: order ?? undefined,
  });

  const filteredNews = useMemo(() => {
    const normalizedSearch = normalizeText(search);

    return news.filter((item) => {
      const matchesSearch =
        normalizeText(item.title).includes(normalizedSearch) ||
        normalizeText(item.description).includes(normalizedSearch);

      return matchesSearch;
    });
  }, [news, search]);

  const handleCategory = useCallback((category: Category | null) => {
    setCategory(category);
  }, []);

  const handleIsCreateDialogOpen = useCallback((open: boolean) => {
    setIsCreateDialogOpen(open);
  }, []);

  function handleOpenEditDialog(news: INews) {
    setIsEditDialogOpen(true);
    setPostToEdit(news);
  }

  function handleCloseEditDialog() {
    setIsEditDialogOpen(false);
    setPostToEdit(null);
  }

  const handleSearch = useCallback((searchTerm: string) => {
    setSearch(searchTerm);
  }, []);

  const handleNewsOrder = useCallback((newsOrder: Order | null) => {
    setOrder(newsOrder);
  }, []);

  return {
    search,
    filteredNews,
    isLoading,
    postToEdit,
    category,
    isCreateDialogOpen,
    isEditDialogOpen,
    handleNewsOrder,
    handleSearch,
    handleCategory,
    handleOpenEditDialog,
    handleCloseEditDialog,
    handleIsCreateDialogOpen,
  };
}
