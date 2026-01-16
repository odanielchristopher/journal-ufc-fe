import { useState } from 'react';
import { Button } from '@views/components/ui/Button';
import { Input } from '@views/components/ui/Input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@views/components/ui/DropdownMenu';
import { ChevronDown, Plus } from 'lucide-react';

export function PostsSection() {
  const [category, setCategory] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Gerenciar Postagens</h2>
          <p className="text-muted-foreground text-sm">
            Crie, edite e remova postagens do jornal
          </p>
        </div>

        <Button type="button" className="gap-2">
          <Plus className="size-4" />
          Nova Postagem
        </Button>
      </div>

      <div className="flex flex-col gap-4 md:flex-row">
        <Input
          name="search"
          placeholder="Buscar postagens..."
          floatingLabel={false}
          className="
            md:w-1/3
            bg-gray-100
            border border-gray-300
            focus:bg-gray-100
            h-9
          "
        />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              type='button'
              variant="outline"
              className="
                md:w-52
                h-9
                justify-between
                bg-gray-100
                border border-gray-300
                text-muted-foreground
                font-normal
              "
            >
              {category ?? 'Todas categorias'}
              <ChevronDown className="size-4 opacity-50" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="start" className="w-52">
            <DropdownMenuItem onClick={() => setCategory(null)}>
              Todas categorias
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => setCategory('Destaque')}>
              Destaque
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => setCategory('Pesquisa')}>
              Pesquisa
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => setCategory('Extensão')}>
              Extensão
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* postagens */}
    </div>
  );
}
