import { useEffect, useMemo, useState } from 'react';
import { Button } from '@views/components/ui/Button';
import { Input } from '@views/components/ui/Input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@views/components/ui/DropdownMenu';
import {
  ChevronDown,
  Plus,
  Search,
  ListFilter,
  Pencil,
  Trash2,
} from 'lucide-react';

import type { INews } from '@app/entities/News';
import { newsService } from '@app/services/newsService';
import { capitalizeFirstLetter } from '@app/utils/capitalizeFirstLetter';
import { normalizeText } from '@app/utils/normalizeText';

export function PostsSection() {
  const [category, setCategory] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [news, setNews] = useState<INews[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    newsService
      .getAll()
      .then((data) => setNews(data))
      .finally(() => setIsLoading(false));
  }, []);

  const filteredNews = useMemo(() => {
  const normalizedSearch = normalizeText(search);

  return news.filter((item) => {
    const matchesCategory =
      !category || item.tag === category.toLowerCase();

    const matchesSearch =
      normalizeText(item.title).includes(normalizedSearch) ||
      normalizeText(item.description).includes(normalizedSearch);

    return matchesCategory && matchesSearch;
  });
}, [news, category, search]);

  const categories = useMemo(() => {
    const tags = news.map((item) => item.tag.toLowerCase());
    return Array.from(new Set(tags));
  }, [news]);

  return (
    <div className="space-y-8">
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
          <div className="relative md:w-1/3">
            <Input
              name="search"
              placeholder="Buscar postagens..."
              floatingLabel={false}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="
                md:w-full
                pl-9
                bg-gray-100
                border border-gray-300
                focus:bg-gray-100
                h-9
                py-0
                leading-9
              "
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                type="button"
                variant="outline"
                className="
                  md:w-52
                  h-9
                  justify-between
                  bg-gray-100
                  border border-gray-300
                  text-muted-foreground
                  font-normal
                  gap-2
                "
              >
                <div className="flex items-center gap-2">
                  <ListFilter className="size-4 text-gray-500" />
                  {category
                    ? capitalizeFirstLetter(category)
                    : 'Todas categorias'}
                </div>

                <ChevronDown className="size-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="start" className="w-52">
              <DropdownMenuItem onClick={() => setCategory(null)}>
                Todas categorias
              </DropdownMenuItem>

              {categories.map((cat) => (
                <DropdownMenuItem
                  key={cat}
                  onClick={() => setCategory(cat)}
                >
                  {capitalizeFirstLetter(cat)}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="space-y-4">
        {isLoading && (
          <p className="text-sm text-muted-foreground">Carregando...</p>
        )}

        {!isLoading && filteredNews.length === 0 && (
          <p className="text-sm text-muted-foreground">
            Nenhuma postagem encontrada.
          </p>
        )}

        {filteredNews.map((item) => (
          <div
            key={item.id}
            className="
              flex items-start gap-4
              rounded-lg
              border border-gray-200
              bg-white
              p-4
              transition hover:bg-gray-50
            "
          >
            <img
              src={item.imageUrl}
              alt={item.title}
              className="h-24 w-40 rounded-md object-cover"
            />

            <div className="flex flex-1 flex-col gap-1">
              <span className="w-fit rounded-full bg-green-100 px-3 py-0.5 text-xs font-medium text-green-700">
                {capitalizeFirstLetter(item.tag)}
              </span>

              <h3 className="text-base font-semibold leading-snug">
                {item.title}
              </h3>

              <p className="line-clamp-2 text-sm text-muted-foreground">
                {item.description}
              </p>

              <span className="text-xs text-muted-foreground">
                Por {item.editor} •{' '}
                {new Date(item.publicationDate).toLocaleDateString('pt-BR')}
              </span>
            </div>

            <div className="flex gap-2">
              <Button type="button" variant="ghost" size="icon">
                <Pencil className="size-4" />
              </Button>
              <Button type="button" variant="ghost" size="icon">
                <Trash2 className="size-4 text-red-500" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
