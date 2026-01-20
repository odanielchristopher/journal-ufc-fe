import {
  BriefcaseBusinessIcon,
  Newspaper,
  NewspaperIcon,
  UsersIcon,
} from 'lucide-react';

import { Role } from '@app/enums/Role';
import { useAuth } from '@app/hooks/useAuth';
import { useNews } from '@app/hooks/useNews';
import { useUsers } from '@app/hooks/useUsers';
import { Button } from '@views/components/ui/Button';

const rolemap: Record<Role, string> = {
  ADMIN: 'Administrador',
  EDITOR: 'Editor',
};

export function OverviewSection() {
  const { user } = useAuth();
  const { users } = useUsers();
  const { news } = useNews();

  if (!user) return null;

  return (
    <div className="space-y-4">
      <div className="space-y-6 rounded-lg border bg-white p-4 sm:p-6">
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-normal">
            Bem-vindo, {user.nickname}! 👋
          </h2>

          <p className="text-muted-foreground text-base">
            {user.role === Role.ADMIN &&
              'Como administrador, você tem acesso completo ao sistema. Você pode criar, editar e remover postagens, além de gerenciar usuários.'}
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Button type="button" className="h-10">
              <Newspaper />
              Gerenciar postagens
            </Button>

            {user.role === Role.ADMIN && (
              <Button type="button" variant="outline" className="h-10 bg-white">
                <UsersIcon />
                Gerenciar usuários
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-lg border bg-white p-4 sm:p-6">
          <div className="mb-1 w-fit rounded-sm bg-green-100 p-3 text-green-600">
            <NewspaperIcon />
          </div>

          <span className="text-muted-foreground text-sm">
            Total de postagens
          </span>

          <strong className="mt-4 block text-2xl font-medium">
            {news.length}
          </strong>
        </div>

        <div className="rounded-lg border bg-white p-4 sm:p-6">
          <div className="mb-1 w-fit rounded-sm bg-blue-100 p-3 text-blue-600">
            <UsersIcon />
          </div>

          <span className="text-muted-foreground text-sm">
            Total de editores
          </span>

          <strong className="mt-4 block text-2xl font-medium">
            {users.length}
          </strong>
        </div>

        <div className="rounded-lg border bg-white p-4 sm:p-6">
          <div className="mb-1 w-fit rounded-sm bg-teal-100 p-3 text-teal-700">
            <BriefcaseBusinessIcon />
          </div>

          <span className="text-muted-foreground text-sm">Seu perfil</span>

          <strong className="mt-4 block text-2xl font-medium">
            {rolemap[user.role]}
          </strong>
        </div>
      </div>
    </div>
  );
}
