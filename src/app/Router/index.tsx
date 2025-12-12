import { AnimatePresence } from 'motion/react';
import { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router';

import { AuthGuard } from '@app/guards/AuthGuard';
import { lazyLoad } from '@app/utils/lazyLoad';
import { LaunchScreen } from '@views/components/app/LaunchScreen';

import { routes } from './routes';

const { AuthLayout } = lazyLoad(() => import('@views/layouts/AuthLayout'));

const { Dashboard } = lazyLoad(() => import('@views/pages/Dashboard'));
const { Login } = lazyLoad(() => import('@views/pages/Login'));
const { Register } = lazyLoad(() => import('@views/pages/Register'));

export function Router() {
  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<LaunchScreen />}>
        <Routes>
          <Route index element={<Navigate to={routes.login} />} />

          <Route element={<AuthGuard isPrivate />}>
            <Route path={routes.dashboard} element={<Dashboard />} />
          </Route>

          <Route element={<AuthGuard isPrivate={false} />}>
            <Route element={<AuthLayout />}>
              <Route path={routes.login} element={<Login />} />
              <Route path={routes.register} element={<Register />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
}
