import { HomeIcon, LayoutDashboardIcon, LogOutIcon } from 'lucide-react';
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
    <div className="min-h-screen bg-gray-50">
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

      <main className="flex justify-center p-6">
        <div className="w-[80%] space-y-6">
          <Tabs defaultValue="posts" className="w-full space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <TabsList className="flex w-full rounded-full bg-gray-100 p-1 h-10">
                <TabsTrigger
                  value="overview"
                  className="
                    flex-1 rounded-full
                    text-sm font-medium text-gray-600
                    data-[state=active]:bg-white
                    data-[state=active]:text-gray-900
                    data-[state=active]:shadow-sm
                  "
                >
                  Visão Geral
                </TabsTrigger>

                <TabsTrigger
                  value="posts"
                  className="
                    flex-1 rounded-full
                    text-sm font-medium text-gray-600
                    data-[state=active]:bg-white
                    data-[state=active]:text-gray-900
                    data-[state=active]:shadow-sm
                  "
                >
                  Postagens
                </TabsTrigger>

                <TabsTrigger
                  value="users"
                  className="
                    flex-1 rounded-full
                    text-sm font-medium text-gray-600
                    data-[state=active]:bg-white
                    data-[state=active]:text-gray-900
                    data-[state=active]:shadow-sm
                  "
                >
                  Usuários
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
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
                  Gerenciamento de usuários
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
