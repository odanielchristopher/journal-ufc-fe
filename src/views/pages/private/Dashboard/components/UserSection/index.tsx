import { Plus, Search } from "lucide-react";
import { Skeleton } from "@views/components/ui/Skeleton";
import { UserCard } from "@views/components/app/UserCard";
import { Button } from "@views/components/ui/Button";
import { Input } from "@views/components/ui/Input";
import { CategoryDropdown } from "@views/components/app/CategoryDropdown";
import { useUsersSectionController } from "./useUserSectionController";
import { CreateUserDialog } from "./CreateUserDialog";
import { EditUserDialog } from "./EditUserDialog";
import { DeleteUserDialog } from "./DeleteUserDialog";
import { Role } from '@app/enums/Role';
import { RoleDataMapper } from '@app/datamappers/RoleDataMapper';

export function UsersSection() {
  const {
    search,
    filteredUsers,
    isCreateDialogOpen,
    isEditDialogOpen,
    isLoading,
    userToEdit,
    userToDelete,
    role,
    handleIsCreateDialogOpen,
    handleOpenEditDialog,
    handleCloseEditDialog,
    handleSearch,
    handleSetUserToDelete,
    handleResetUserToDelete,
    handleRole,
  } = useUsersSectionController();

  return (
    <div className="space-y-8">
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold">Gerenciar Usuários</h2>
            <p className="text-muted-foreground text-sm">
              Crie, edite e remova usuários do sistema
            </p>
          </div>

          <Button
            type="button"
            className="gap-2 self-start sm:self-auto whitespace-nowrap"
            onClick={() => handleIsCreateDialogOpen(true)}
          >
            <Plus className="size-4" />
            Novo Usuário
          </Button>
        </div>

        <div className="flex flex-col gap-4 md:flex-row">
          <div className="relative md:w-1/3">
            <Input
              name="search"
              placeholder="Buscar usuários..."
              floatingLabel={false}
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              className="h-9 border border-gray-300 bg-gray-100 py-0 pl-9 leading-9 focus:bg-gray-100 md:w-full"
            />
            <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-gray-400" />
          </div>

          <CategoryDropdown
            value={role ?? undefined}
            enumObj={{
              ADMIN: 'ADMIN',
              EDITOR: 'EDITOR',
            }}
            labelMapper={(role) => RoleDataMapper.toDomain(role as Role)}
            onValueChange={handleRole}
            placeholder="Todas funções"
          />
        </div>
      </div>

      <div className="space-y-4">
        {isLoading && (
          <>
            <Skeleton className="h-20" />
            <Skeleton className="h-20" />
            <Skeleton className="h-20" />
            <Skeleton className="h-20" />
            <Skeleton className="h-20" />
          </>
        )}

        {!isLoading && filteredUsers.length === 0 && (
          <p className="text-muted-foreground text-sm">
            Nenhum usuário encontrado.
          </p>
        )}

        {filteredUsers.map((item) => (
          <UserCard
            key={item.id}
            user={item}
            variant="edit"
            onEdit={() => handleOpenEditDialog(item)}
            onRemove={() => handleSetUserToDelete(Number(item.id))}
          />
        ))}
      </div>

      <CreateUserDialog
        isOpen={isCreateDialogOpen}
        onClose={() => handleIsCreateDialogOpen(false)}
      />

      {userToEdit && (
        <EditUserDialog
          user={userToEdit}
          isOpen={isEditDialogOpen}
          onClose={handleCloseEditDialog}
        />
      )}

      <DeleteUserDialog
        userId={userToDelete}
        isOpen={!!userToDelete}
        onClose={handleResetUserToDelete}
      />
    </div>
  );
}