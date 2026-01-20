import { ChevronDown, ListFilter } from 'lucide-react';
import { useMemo, useState } from 'react';

import { cn } from '@app/lib/utils';
import { Button } from '@views/components/ui/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@views/components/ui/DropdownMenu';

import { FieldError } from '../ui/FieldError';

type EnumObject = Record<string, string | number>;

interface CategoryDropdownProps<T extends EnumObject> {
  value?: T[keyof T];
  className?: string;
  error?: string;
  isFilter?: boolean;
  placeholder?: string;
  enumObj: T;
  labelMapper?: (value: T[keyof T]) => string;
  onValueChange?(value: T[keyof T] | null): void;
}

export function CategoryDropdown<T extends EnumObject>({
  value,
  error,
  className,
  placeholder,
  isFilter = true,
  enumObj,
  labelMapper = (val) => String(val),
  onValueChange,
}: CategoryDropdownProps<T>) {
  const [selectedValue, setSelectedValue] = useState<T[keyof T] | null>(value ?? null);

  const enumValues = useMemo(() => {
    if (!enumObj) {
      console.warn('Enum object is undefined');
      return [];
    }

    try {
      const values = Object.values(enumObj as any);
      
      const stringValues = values.filter(
        (value) => typeof value === 'string'
      ) as T[keyof T][];
      
      return stringValues;
    } catch {
      return [];
    }
  }, [enumObj]);

  function handleValueChange(value: T[keyof T] | null) {
    setSelectedValue(value);
    onValueChange?.(value);
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
              selectedValue && 'text-black',
              className,
            )}
          >
            <div className="flex items-center gap-2">
              {isFilter && (
                <ListFilter
                  className={cn(
                    'size-4 text-gray-500',
                    selectedValue && 'text-black',
                  )}
                />
              )}

              {selectedValue
                ? labelMapper(selectedValue)
                : (placeholder ?? 'Todos')}
            </div>

            <ChevronDown className="size-4 opacity-50" />
          </Button>

          {error && <FieldError message={error} />}
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" className="w-52">
        {isFilter && (
          <DropdownMenuItem onClick={() => handleValueChange(null)}>
            {placeholder ?? 'Todos'}
          </DropdownMenuItem>
        )}

        {enumValues.map((enumValue) => (
          <DropdownMenuItem
            key={String(enumValue)}
            onClick={() =>
              handleValueChange(selectedValue !== enumValue ? enumValue : null)
            }
          >
            {labelMapper(enumValue)}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}