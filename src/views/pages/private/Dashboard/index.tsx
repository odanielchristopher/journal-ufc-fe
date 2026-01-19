import {
  HomeIcon,
  LayoutDashboardIcon,
  LogOutIcon,
  LayoutGrid,
  Newspaper,
  Users,
} from 'lucide-react';

import { Link, Navigate } from 'react-router';

import { useAuth } from '@app/hooks/useAuth';
import { routes } from '@app/Router/routes';
import { Button } from '@views/components/ui/Button';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@views/components/ui/Tabs';

import { UserInfoContainer } from './components/UserInfoContainer';
import { PostsSection } from '../Dashboard/components/PostsSection';

export function Dashboard() {
  const { user, signout } = useAuth();

  if (!user) return <Navigate to={routes.login} replace />;

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-gray-100">
      <header className="flex w-full flex-col gap-4 border-b bg-white p-4 sm:h-20 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div className="flex items-center gap-3 text-teal-700">
          <LayoutDashboardIcon className="stroke-[2.2]" />
          <h1 className="text-2xl font-medium">Painel Administrativo</h1>
        </div>

        <div className="flex items-center gap-4">
          <UserInfoContainer user={user} />

          <Button type="button" variant="outline" className="bg-white" asChild>
            <Link to={routes.home} className="flex items-center gap-2">
              <HomeIcon className="size-5" />
              <span className="hidden sm:inline">Ir para o site</span>
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

      <main className="flex justify-center p-6">
        <div className="w-full max-w-7x1 space-y-6">
          <Tabs defaultValue="posts" className="w-full space-y-6">
            <TabsList className="
              flex w-full max-w-full
              flex-wrap
              rounded-full bg-gray-200 p-1
            ">
              <TabsTrigger value="overview" className="
                flex flex-1 min-w-0
                items-center justify-center gap-2
                rounded-full text-sm font-medium
                text-gray-600
                    data-[state=active]:bg-white
                    data-[state=active]:text-gray-900
                    data-[state=active]:shadow-sm
              ">
                  <LayoutGrid className="size-4" />
                  Visão Geral
                </TabsTrigger>

              <TabsTrigger value="posts" className="
                flex flex-1 min-w-0
                items-center justify-center gap-2
                rounded-full text-sm font-medium
                text-gray-600
                    data-[state=active]:bg-white
                    data-[state=active]:text-gray-900
                    data-[state=active]:shadow-sm
              ">
                  <Newspaper className="size-4" />
                  Postagens
                </TabsTrigger>

              <TabsTrigger value="users" className="
                flex flex-1 min-w-0
                items-center justify-center gap-2
                rounded-full text-sm font-medium
                text-gray-600
                    data-[state=active]:bg-white
                    data-[state=active]:text-gray-900
                    data-[state=active]:shadow-sm
                  "
                >
                  <Users className="size-4" />
                  Usuários
                </TabsTrigger>
              </TabsList>

            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
              <TabsContent value="posts" className="m-0">
                <PostsSection />
              </TabsContent>

              <TabsContent value="overview" className="m-0">
                <div className="text-muted-foreground">
                  Visão geral do sistema
                </div>
              </TabsContent>

              <TabsContent value="users" className="m-0">
                <div className="text-muted-foreground">
                  <UsersSection />
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
