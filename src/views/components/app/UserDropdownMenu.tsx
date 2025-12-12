import { PencilLineIcon } from 'lucide-react';

import { useAuth } from '@app/hooks/useAuth';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@views/components/ui/Avatar';
import { Button } from '@views/components/ui/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@views/components/ui/DropdownMenu';

export function UserDropdownMenu() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          className="flex items-center gap-2 rounded-md p-2.5"
        >
          <Avatar className="size-9">
            <AvatarImage className="object-cover" src={user.avatarPath} />
            <AvatarFallback className="bg-primary size-9 text-sm">
              {user.firstName
                .slice(0, 1)
                .concat(user.lastName.slice(0, 1))
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-col">
            <strong className="text-sm">
              {user.firstName} {user.lastName}
            </strong>

            <small className="text-muted-foreground text-xs">
              {user.email}
            </small>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-50 px-2 py-4" align="end">
        <div className="mb-5 flex flex-col items-center">
          <Avatar className="ring-offset-card size-30 ring-2 ring-teal-400 ring-offset-2">
            <AvatarImage className="object-cover" src={user.avatarPath} />
            <AvatarFallback className="bg-primary size-30 text-4xl">
              {user.firstName
                .slice(0, 1)
                .concat(user.lastName.slice(0, 1))
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div className="mt-3 flex max-w-50 flex-col items-center">
            <strong className="line-clamp-1 text-sm">
              {user.firstName} {user.lastName}
            </strong>

            <small className="text-muted-foreground line-clamp-1 text-xs">
              {user.email}
            </small>
          </div>
        </div>

        <DropdownMenuItem asChild>
          <Button
            type="button"
            variant="ghost"
            className="w-full cursor-pointer items-center justify-between"
          >
            Editar perfil <PencilLineIcon className="text-foreground" />
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
