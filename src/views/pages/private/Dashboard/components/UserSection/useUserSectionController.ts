import { useCallback, useMemo, useState } from "react";
import { useUsers } from "@app/hooks/useUsers";
import { normalizeText } from "@app/utils/normalizeText";
import { Category } from "@app/entities/User";

export function useUsersSectionController() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<Category | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);

  const { users, isLoading } = useUsers();

  const filteredUsers = useMemo(() => {
    const normalizedSearch = normalizeText(search);

    return users.filter((item) => {
      const matchesCategory = !category || item.category === category;
      const matchesSearch =
        normalizeText(item.name).includes(normalizedSearch) ||
        normalizeText(item.email).includes(normalizedSearch);

      return matchesCategory && matchesSearch;
    });
  }, [users, search, category]);

  const handleIsCreateDialogOpen = useCallback((open: boolean) => {
    setIsCreateDialogOpen(open);
  }, []);

  const handleSearch = useCallback((searchTerm: string) => {
    setSearch(searchTerm);
  }, []);

  const handleCategory = useCallback((category: Category | null) => {
    setCategory(category);
  }, []);

  const handleSetUserToDelete = useCallback((id: string) => {
    setUserToDelete(id);
  }, []);

  const handleResetUserToDelete = useCallback(() => {
    setUserToDelete(null);
  }, []);

  return {
    search,
    category,
    filteredUsers,
    isLoading,
    isCreateDialogOpen,
    userToDelete,
    handleIsCreateDialogOpen,
    handleSearch,
    handleCategory,
    handleSetUserToDelete,
    handleResetUserToDelete,
  };
}
