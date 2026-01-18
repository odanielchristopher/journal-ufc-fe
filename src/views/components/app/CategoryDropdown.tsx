import { ChevronDown, ListFilter } from 'lucide-react';
import { useMemo, useState } from 'react';

import { CategoryDataMapper } from '@app/datamappers/CategoryDataMapper';
import { Category } from '@app/enums/Category';
import { cn } from '@app/lib/utils';
import { Button } from '@views/components/ui/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@views/components/ui/DropdownMenu';

import { FieldError } from '../ui/FieldError';

interface CategoryDropdownProps {
  value?: Category;
  className?: string;
  error?: string;
  isFilter?: boolean;
  placeholder?: string;
  onCategoryChange?(category: Category | null): void;
}

export function CategoryDropdown({
  value,
  error,
  className,
  placeholder,
  isFilter = true,
  onCategoryChange,
}: CategoryDropdownProps) {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    value ?? null,
  );

  const categories = useMemo(() => {
    return Object.values(Category);
  }, []);

  function handleCategory(category: Category | null) {
    setSelectedCategory(category);

    onCategoryChange?.(category);
  }

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <div className="relative">
          <Button
            type="button"
            variant="outline"
            className={cn(
              'text-muted-foreground h-9 justify-between gap-2 border border-gray-300 bg-gray-100 font-normal md:w-52',
              selectedCategory && 'text-black',
              className,
            )}
          >
            <div className="flex items-center gap-2">
              {isFilter && (
                <ListFilter
                  className={cn(
                    'size-4 text-gray-500',
                    selectedCategory && 'text-black',
                  )}
                />
              )}

              {selectedCategory
                ? CategoryDataMapper.toDomain(selectedCategory)
                : (placeholder ?? 'Todas categorias')}
            </div>

            <ChevronDown className="size-4 opacity-50" />
          </Button>

          {error && <FieldError message={error} />}
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" className="w-52">
        {isFilter && (
          <DropdownMenuItem onClick={() => handleCategory(null)}>
            Todas categorias
          </DropdownMenuItem>
        )}

        {categories.map((cat) => (
          <DropdownMenuItem
            key={cat}
            onClick={() =>
              handleCategory(selectedCategory !== cat ? cat : null)
            }
          >
            {CategoryDataMapper.toDomain(cat)}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
