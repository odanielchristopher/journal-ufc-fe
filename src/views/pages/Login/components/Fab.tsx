import { CircleQuestionMark } from 'lucide-react';

import { cn } from '@app/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@views/components/ui/DropdownMenu';

export function Fab({ className }: { className?: string }) {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger
        className={cn(
          'bg-card bg focus:ring-accent-500 fixed right-4 bottom-4 z-50 cursor-pointer rounded-full p-4 shadow-lg',
          className,
        )}
      >
        <CircleQuestionMark />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="p-4">
        <p className="mb-2 text-lg font-semibold">Credenciais de teste</p>

        <p className="max-w-xs">
          <strong>Email: </strong>
          <span>joao@mail.com</span>
        </p>

        <p className="max-w-xs">
          <strong>Senha: </strong>
          <span>joao12</span>
        </p>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
