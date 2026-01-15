import { HomeIcon, LayoutDashboardIcon, LogOutIcon } from 'lucide-react';
import { Link, Navigate } from 'react-router';

import { useAuth } from '@app/hooks/useAuth';
import { routes } from '@app/Router/routes';
import { Button } from '@views/components/ui/Button';

import { UserInfoContainer } from './components/UserInfoContainer';

export function Dashboard() {
  const { user, signout } = useAuth();

  if (!user) return <Navigate to={routes.login} replace />;

  return (
    <div>
      <header className="flex h-20 w-full items-center justify-between border-b bg-white p-6">
        <div className="flex items-center gap-3 text-teal-700">
          <LayoutDashboardIcon className="stroke-[2.2]" />
          <h1 className="text-2xl font-medium">Painel Administrativo</h1>
        </div>

        <div className="flex items-center gap-4">
          <UserInfoContainer user={user} />

          <Button type="button" variant="outline" className="bg-white" asChild>
            <Link to={routes.home}>
              <HomeIcon className="size-5" />
              Ir para o site
            </Link>
          </Button>

          <Button
            type="button"
            variant="outline"
            className="bg-white"
            onClick={signout}
          >
            <LogOutIcon className="size-5" />
            Sair
          </Button>
        </div>
      </header>

      <main className="grid grid-cols-1 gap-3 p-4 min-[500px]:grid-cols-2 md:grid-cols-3 md:p-8 lg:grid-cols-4">
        Conteudo do dashboard
      </main>
    </div>
  );
}
