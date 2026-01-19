import { ChevronDown, ListFilter } from 'lucide-react';
import { useMemo, useState } from 'react';

import { capitalizeFirstLetter } from '@app/utils/capitalizeFirstLetter';
import { Button } from '@views/components/ui/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@views/components/ui/DropdownMenu';

interface CategoryDropdownProps {
  categories: Record<string, string>;
  onCategoryChange?(category: string | null): void;
}

export function CategoryDropdown({ categories, onCategoryChange }: CategoryDropdownProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    null,
  );

  const categoryValues = useMemo(() => {
    return Object.values(categories);
  }, [categories]);

  function handleCategory(category: string | null) {
    setSelectedCategory(category);
    onCategoryChange?.(category);
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className="text-muted-foreground h-9 justify-between gap-2 border border-gray-300 bg-gray-100 font-normal md:w-52"
        >
          <div className="flex items-center gap-2">
            <ListFilter className="size-4 text-gray-500" />
            {selectedCategory
              ? capitalizeFirstLetter(selectedCategory.toLowerCase())
              : 'Todas categorias'}
          </div>

          <ChevronDown className="size-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" className="w-52">
        <DropdownMenuItem onClick={() => handleCategory(null)}>
          Todas categorias
        </DropdownMenuItem>

        {categoryValues.map((cat) => (
          <DropdownMenuItem key={cat} onClick={() => handleCategory(cat)}>
            {capitalizeFirstLetter(cat.toLowerCase())}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}