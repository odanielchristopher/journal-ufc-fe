import { LogInIcon } from 'lucide-react';
import { Link } from 'react-router';

import { routes } from '@app/Router/routes';
import { Button } from '@views/components/ui/Button';

export function Home() {
  return (
    <div>
      <header className="flex w-full items-center border-b-2 bg-white shadow-lg">
        <div className="mx-auto flex w-full max-w-7xl justify-between px-8 py-4">
          <div className="flex items-center justify-center gap-4">
            <span className="flex size-13 items-center justify-center rounded-md bg-teal-700 text-xl font-bold text-white">
              UFC
            </span>

            <div className="flex flex-col">
              <strong className="font-bold">Jornal UFC</strong>
              <small className="text-muted-foreground text-base leading-4">
                Campus de Quixadá
              </small>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            className="border-teal-700 bg-white text-teal-700 hover:bg-gray-100 hover:text-teal-700"
            asChild
          >
            <Link to={routes.login}>
              <LogInIcon className="size-5" />
              Entrar
            </Link>
          </Button>
        </div>
      </header>
    </div>
  );
}
