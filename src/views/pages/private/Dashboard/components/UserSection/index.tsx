// UsersSection.tsx
import { Plus, Search } from "lucide-react";
import { UserCard } from "@views/components/app/UserCard";
import { Button } from "@views/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@views/components/ui/Dialog";
import { Input } from "@views/components/ui/Input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@views/components/ui/AlertDialog";

import { CategoryDropdown } from "../CategoryDropdown";
import { useUsersSectionController } from "./useUserSectionController";
import { Category } from "@app/entities/User";

export function UsersSection() {
  const {
    search,
    filteredUsers,
    isCreateDialogOpen,
    isLoading,
    userToDelete,
    handleIsCreateDialogOpen,
    handleSearch,
    handleSetUserToDelete,
    handleResetUserToDelete,
    handleCategory,
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
            categories={Category}
            onCategoryChange={handleCategory}
          />
        </div>
      </div>

      <div className="space-y-4">
        {isLoading && (
          <p className="text-muted-foreground text-sm">Carregando...</p>
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
            onEdit={() => console.log("Editando usuário")}
            onRemove={() => handleSetUserToDelete(item.id)}
          />
        ))}
      </div>

      <Dialog open={isCreateDialogOpen} onOpenChange={handleIsCreateDialogOpen}>
        <DialogContent className="w-[95vw] max-w-[640px] sm:w-full">
          <DialogHeader>
            <DialogTitle>Novo Usuário</DialogTitle>
          </DialogHeader>
          <div className="h-100" />
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={!!userToDelete}
        onOpenChange={(open) => {
          if (!open) handleResetUserToDelete();
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
            <AlertDialogDescription>
              Essa ação é irreversível. Você realmente deseja apagar este usuário?
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>

            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700"
              onClick={() => {
                if (!userToDelete) return;
                console.log("Apagando usuário:", userToDelete);
                handleResetUserToDelete();
              }}
            >
              Apagar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}