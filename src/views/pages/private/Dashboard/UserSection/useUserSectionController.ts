import { useCallback, useMemo, useState } from 'react';

import type { IUser } from '@app/entities/User';
import { Role } from '@app/enums/Role';
import { useUsers } from '@app/hooks/useUsers';
import { normalizeText } from '@app/utils/normalizeText';

export function useUsersSectionController() {
  const [role, setRole] = useState<Role | null>(null);
  const [search, setSearch] = useState('');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState<IUser | null>(null);
  const [userToDelete, setUserToDelete] = useState<number | null>(null);

  const { isLoading, users } = useUsers();

  const filteredUsers = useMemo(() => {
    const normalizedSearch = normalizeText(search);

    return users.filter((user) => {
      const matchesSearch =
        normalizeText(user.nickname || '').includes(normalizedSearch) ||
        normalizeText(user.username || '').includes(normalizedSearch);

      return matchesSearch;
    });
  }, [users, search]);

  const roles = useMemo(() => {
    return Object.values(Role);
  }, []);

  const handleRole = useCallback((selectedRole: Role | null) => {
    setRole(selectedRole);
  }, []);

  const handleIsCreateDialogOpen = useCallback((open: boolean) => {
    setIsCreateDialogOpen(open);
  }, []);

  const handleOpenEditDialog = useCallback((user: IUser) => {
    setIsEditDialogOpen(true);
    setUserToEdit(user);
  }, []);

  const handleCloseEditDialog = useCallback(() => {
    setIsEditDialogOpen(false);
    setUserToEdit(null);
  }, []);

  const handleSearch = useCallback((searchTerm: string) => {
    setSearch(searchTerm);
  }, []);

  const handleSetUserToDelete = useCallback((id: number) => {
    setUserToDelete(id);
  }, []);

  const handleResetUserToDelete = useCallback(() => {
    setUserToDelete(null);
  }, []);

  return {
    search,
    filteredUsers,
    isLoading,
    userToEdit,
    role,
    roles,
    isCreateDialogOpen,
    userToDelete,
    isEditDialogOpen,
    handleSearch,
    handleRole,
    handleOpenEditDialog,
    handleCloseEditDialog,
    handleIsCreateDialogOpen,
    handleSetUserToDelete,
    handleResetUserToDelete,
  };
}
