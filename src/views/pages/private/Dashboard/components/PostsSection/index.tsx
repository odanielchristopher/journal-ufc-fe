import { Plus, Search } from 'lucide-react';

import { NewsCard } from '@views/components/app/NewsCard';
import { Button } from '@views/components/ui/Button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@views/components/ui/Dialog';
import { Input } from '@views/components/ui/Input';

import { CategoryDropdown } from '../CategoryDropdown';

import { usePostsSectionController } from './usePostsSectionController';

export function PostsSection() {
  const {
    search,
    filteredNews,
    isCreateDialogOpen,
    isLoading,
    handleIsCreateDialogOpen,
    handleSearch,
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

          <CategoryDropdown />
        </div>
      </div>

      <div className="space-y-4">
        {isLoading && (
          <p className="text-muted-foreground text-sm">Carregando...</p>
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
            onEdit={() => console.log('Editando o conteudo')}
            onRemove={() => console.log('Apagando o conteudo')}
          />
        ))}
      </div>

      <Dialog open={isCreateDialogOpen} onOpenChange={handleIsCreateDialogOpen}>
        <DialogContent className="
            w-[95vw] max-w-[640px]
            sm:w-full
          ">
          <DialogHeader>
            <DialogTitle>Nova Postagem</DialogTitle>
          </DialogHeader>

          {/* formulário entra aqui depois */}
          <div className="h-100" />
        </DialogContent>
      </Dialog>
    </div>
  );
}
