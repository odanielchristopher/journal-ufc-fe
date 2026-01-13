import { Route, Routes } from 'react-router';

import { AuthGuard } from '@app/guards/AuthGuard';
import { Dashboard } from '@views/pages/Dashboard';
import { Home } from '@views/pages/Home';
import { Login } from '@views/pages/Login';

import { routes } from './routes';

export function Router() {
  return (
    <Routes>
      <Route index element={<Home />} />

      <Route element={<AuthGuard isPrivate />}>
        <Route path={routes.dashboard} element={<Dashboard />} />
      </Route>

      <Route element={<AuthGuard isPrivate={false} />}>
        <Route path={routes.login} element={<Login />} />
      </Route>
    </Routes>
  );
}
