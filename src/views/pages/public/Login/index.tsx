import { Navigate } from 'react-router';

import { env } from '@app/config/env';
import { routes } from '@app/Router/routes';
import { Button } from '@views/components/ui/Button';
import { Input } from '@views/components/ui/Input';

import { Fab } from './components/Fab';
import { useLoginController } from './useLoginController';

export function Login() {
  const { signedIn, errors, isLoading, register, handleSubmit } =
    useLoginController();

  if (signedIn) {
    return <Navigate to={routes.dashboard} replace />;
  }

  return (
    <div className="relative grid h-full place-items-center">
      {env.VITE_DEVELOPMENT && <Fab />}
      <div className="flex w-full max-w-125 flex-col items-center gap-8 px-4">
        <h1 className="dark:text-foreground text-2xl font-semibold tracking-[-1px] text-teal-600">
          Jornal UFC Quixadá
        </h1>

        <main className="bg-card w-full rounded-xl border p-6 shadow-sm">
          <header className="flex flex-col items-center gap-2">
            <p>Entre em sua conta para acessar o painel de controle.</p>
          </header>
          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
            <Input
              placeholder="E-mail"
              error={errors.email?.message}
              {...register('email')}
            />

            <Input
              type="password"
              placeholder="Senha"
              error={errors.password?.message}
              {...register('password')}
            />

            <Button type="submit" className="mt-2" isLoading={isLoading}>
              Entrar
            </Button>
          </form>
        </main>
      </div>
    </div>
  );
}
