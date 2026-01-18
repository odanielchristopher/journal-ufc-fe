import * as React from 'react';

import { cn } from '@app/lib/utils';

import { FieldError } from './FieldError';

interface ITextareaProps extends React.ComponentProps<'textarea'> {
  name: string;
  error?: string;
  floatingLabel?: boolean;
}

export function Textarea({
  id,
  name,
  placeholder,
  error,
  className,
  floatingLabel = true,
  ...props
}: ITextareaProps) {
  const textareaId = id ?? name;

  return (
    <div className="relative w-full">
      <textarea
        data-slot="textarea"
        id={textareaId}
        name={name}
        className={cn(
          'border-input placeholder:text-muted-foreground dark:bg-input/30 peer flex min-h-24 w-full resize-y rounded-md border px-[10.5px] py-2 pt-5 text-sm shadow-xs transition-all outline-none placeholder-shown:pt-3',
          'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
          'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
          'disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        placeholder={floatingLabel ? ' ' : placeholder}
        {...props}
      />

      {floatingLabel && (
        <label
          htmlFor={textareaId}
          className={cn(
            'text-muted-foreground pointer-events-none absolute left-3 transition-all',
            'top-2 text-xs',
            'peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm',
          )}
        >
          {placeholder}
        </label>
      )}

      {error && <FieldError message={error} />}
    </div>
  );
}
