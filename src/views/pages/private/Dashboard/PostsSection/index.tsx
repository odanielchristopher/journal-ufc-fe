import { Plus, Search } from "lucide-react";
import { Skeleton } from "@views/components/ui/Skeleton";
import { NewsCard } from "@views/components/app/NewsCard";
import { Button } from "@views/components/ui/Button";
import { Input } from "@views/components/ui/Input";
import { CategoryDropdown } from "@views/components/app/CategoryDropdown";
import { OrderSelect } from "@views/components/app/OrderSelect";
import { CreateNewsDialog } from "./CreateNewsDialog";
import { EditNewsDialog } from "./EditNewsDialog";
import { DeleteNewsDialog } from "./DeleteNewsDialog";
import { Category } from '@app/enums/Category';
import { CategoryDataMapper } from '@app/datamappers/CategoryDataMapper';

import { usePostsSectionController } from "./usePostsSectionController";

export function PostsSection() {
  const {
    search,
    order,
    filteredNews,
    isEditDialogOpen,
    isCreateDialogOpen,
    isLoading,
    postToEdit,
    category,
    newsToDelete,
    handleNewsOrder,
    handleIsCreateDialogOpen,
    handleSearch,
    handleCloseEditDialog,
    handleOpenEditDialog,
    handleCategory,
    handleSetNewsToDelete,
    handleResetNewsToDelete,
  } = usePostsSectionController();

  return (
    <div className="space-y-8">
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold">Gerenciar Postagens</h2>
            <p className="text-muted-foreground text-sm">
              Crie, edite e remova postagens do jornal
            </p>
          </div>

          <Button
            type="button"
            className="gap-2 self-start sm:self-auto whitespace-nowrap"
            onClick={() => handleIsCreateDialogOpen(true)}
          >
            <Plus className="size-4" />
            Nova Postagem
          </Button>
        </div>

        <div className="flex flex-col gap-4 md:flex-row">
          <div className="relative md:w-1/3">
            <Input
              name="search"
              placeholder="Buscar postagens..."
              floatingLabel={false}
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              className="h-9 border border-gray-300 bg-gray-100 py-0 pl-9 leading-9 focus:bg-gray-100 md:w-full"
            />
            <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-gray-400" />
          </div>

          <CategoryDropdown
            value={category ?? undefined}
            enumObj={Category}
            labelMapper={(cat) => CategoryDataMapper.toDomain(cat as Category)}
            onValueChange={handleCategory}
            placeholder="Todas categorias"
          />

          <OrderSelect
            value={order ?? undefined}
            onOrderChange={handleNewsOrder}
          />
        </div>
      </div>

      <div className="space-y-4">
        {isLoading && (
          <>
            <Skeleton className="h-40" />
            <Skeleton className="h-40" />
            <Skeleton className="h-40" />
            <Skeleton className="h-40" />
            <Skeleton className="h-40" />
          </>
        )}

        {!isLoading && filteredNews.length === 0 && (
          <p className="text-muted-foreground text-sm">
            Nenhuma postagem encontrada.
          </p>
        )}

        {filteredNews.map((item) => (
          <NewsCard
            key={item.id}
            news={item}
            variant="edit"
            onEdit={() => handleOpenEditDialog(item)}
            onRemove={() => handleSetNewsToDelete(item.id)}
          />
        ))}
      </div>

      <CreateNewsDialog
        isOpen={isCreateDialogOpen}
        onClose={() => handleIsCreateDialogOpen(false)}
      />

      {postToEdit && (
        <EditNewsDialog
          news={postToEdit}
          isOpen={isEditDialogOpen}
          onClose={handleCloseEditDialog}
        />
      )}

      <DeleteNewsDialog
        newsId={newsToDelete}
        isOpen={!!newsToDelete}
        onClose={handleResetNewsToDelete}
      />
    </div>
  );
}