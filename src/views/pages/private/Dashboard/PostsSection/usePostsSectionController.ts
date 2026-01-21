// hooks/usePostsSectionController.ts
import { useCallback, useMemo, useState } from 'react';

import type { INews } from '@app/entities/News';
import { Category } from '@app/enums/Category';
import { Order } from '@app/enums/Order';
import { useNews } from '@app/hooks/useNews';
import { normalizeText } from '@app/utils/normalizeText';

export function usePostsSectionController() {
  const [category, setCategory] = useState<Category | null>(null);
  const [order, setOrder] = useState<Order>(Order.DESC);
  const [search, setSearch] = useState('');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [postToEdit, setPostToEdit] = useState<INews | null>(null);
  const [newsToDelete, setNewsToDelete] = useState<number | null>(null);

  const { isLoading, news } = useNews({
    category: category ?? undefined,
    order: order,
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

  const categories = useMemo(() => {
    return Object.values(Category);
  }, []);

  const handleCategory = useCallback((category: Category | null) => {
    setCategory(category);
  }, []);

  const handleNewsOrder = useCallback((newsOrder: Order) => {
    setOrder(newsOrder);
  }, []);

  const handleIsCreateDialogOpen = useCallback((open: boolean) => {
    setIsCreateDialogOpen(open);
  }, []);

  const handleOpenEditDialog = useCallback((news: INews) => {
    setIsEditDialogOpen(true);
    setPostToEdit(news);
  }, []);

  const handleCloseEditDialog = useCallback(() => {
    setIsEditDialogOpen(false);
    setPostToEdit(null);
  }, []);

  const handleSearch = useCallback((searchTerm: string) => {
    setSearch(searchTerm);
  }, []);

  const handleSetNewsToDelete = useCallback((id: number) => {
    setNewsToDelete(id);
  }, []);

  const handleResetNewsToDelete = useCallback(() => {
    setNewsToDelete(null);
  }, []);

  return {
    search,
    order,
    filteredNews,
    isLoading,
    postToEdit,
    category,
    categories,
    isCreateDialogOpen,
    newsToDelete,
    isEditDialogOpen,
    handleNewsOrder,
    handleSearch,
    handleCategory,
    handleOpenEditDialog,
    handleCloseEditDialog,
    handleIsCreateDialogOpen,
    handleSetNewsToDelete,
    handleResetNewsToDelete,
  };
}
