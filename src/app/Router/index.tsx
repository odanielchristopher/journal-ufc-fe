import { Route, Routes } from 'react-router';

import { AuthGuard } from '@app/guards/AuthGuard';
import { PublicLayout } from '@views/layouts/PublicLayout';
import { Dashboard } from '@views/pages/private/Dashboard';
import { Home } from '@views/pages/public/Home';
import { Login } from '@views/pages/public/Login';
import { ViewNews } from '@views/pages/public/ViewNews';

import { routes } from './routes';
import { routesParams } from './routesParams';

export function Router() {
  return (
    <Routes>
      <Route element={<AuthGuard isPrivate={false} />}>
        <Route path={routes.dashboard} element={<Dashboard />} />
      </Route>

      <Route element={<AuthGuard isPrivate={false} />}>
        <Route path={routes.login} element={<Login />} />

        <Route element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route
            path={`${routes.news}/${routesParams.news.newsId}`}
            element={<ViewNews />}
          />
        </Route>
      </Route>
    </Routes>
  );
}
