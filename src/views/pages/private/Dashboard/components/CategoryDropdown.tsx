import { ChevronDown, ListFilter } from 'lucide-react';
import { useMemo, useState } from 'react';

import { CategoryDataMapper } from '@app/datamappers/CategoryDataMapper';
import { Category } from '@app/enums/Category';
import { Button } from '@views/components/ui/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@views/components/ui/DropdownMenu';

interface CategoryDropdownProps {
  onCategoryChange?(category: Category | null): void;
}

export function CategoryDropdown({ onCategoryChange }: CategoryDropdownProps) {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
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
        <Button
          type="button"
          variant="outline"
          className="text-muted-foreground h-9 justify-between gap-2 border border-gray-300 bg-gray-100 font-normal md:w-52"
        >
          <div className="flex items-center gap-2">
            <ListFilter className="size-4 text-gray-500" />
            {selectedCategory
              ? CategoryDataMapper.toDomain(selectedCategory)
              : 'Todas categorias'}
          </div>

          <ChevronDown className="size-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" className="w-52">
        <DropdownMenuItem onClick={() => handleCategory(null)}>
          Todas categorias
        </DropdownMenuItem>

        {categories.map((cat) => (
          <DropdownMenuItem key={cat} onClick={() => handleCategory(cat)}>
            {CategoryDataMapper.toDomain(cat)}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
