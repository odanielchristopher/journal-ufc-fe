import type { IUser } from '@app/entities/User';
import { Avatar, AvatarFallback } from '@views/components/ui/Avatar';

interface UserInfoContainerProps {
  user: IUser;
}

export function UserInfoContainer({ user }: UserInfoContainerProps) {
  return (
    <div className="flex items-center gap-2 rounded-md p-2.5 max-md:hidden">
      <Avatar className="size-9">
        <AvatarFallback className="text-primary-foreground size-9 bg-gray-600 text-sm">
          {user.nickname.slice(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>

      <div className="flex flex-col">
        <strong className="text-sm">{user.nickname}</strong>

        <small className="text-muted-foreground text-xs">{user.username}</small>
      </div>
    </div>
  );
}
