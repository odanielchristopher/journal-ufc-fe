import { useCallback, useMemo, useState } from 'react';

import { Category } from '@app/entities/News';
import { useNews } from '@app/hooks/useNews';
import { normalizeText } from '@app/utils/normalizeText';

export function usePostsSectionController() {
  const [category, setCategory] = useState<Category | null>(null);
  const [search, setSearch] = useState('');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const { isLoading, news } = useNews();

  const filteredNews = useMemo(() => {
    const normalizedSearch = normalizeText(search);

    return news.filter((item) => {
      const matchesCategory =
        !category || item.category === category.toLowerCase();

      const matchesSearch =
        normalizeText(item.title).includes(normalizedSearch) ||
        normalizeText(item.description).includes(normalizedSearch);

      return matchesCategory && matchesSearch;
    });
  }, [news, category, search]);

  const categories = useMemo(() => {
    return Object.values(Category);
  }, [news]);

  const handleCategory = useCallback((category: Category | null) => {
    setCategory(category);
  }, []);

  const handleIsCreateDialogOpen = useCallback((open: boolean) => {
    setIsCreateDialogOpen(open);
  }, []);

  const handleSearch = useCallback((searchTerm: string) => {
    setSearch(searchTerm);
  }, []);

  return {
    search,
    categories,
    filteredNews,
    isLoading,
    category,
    isCreateDialogOpen,
    handleSearch,
    handleCategory,
    handleIsCreateDialogOpen,
  };
}
