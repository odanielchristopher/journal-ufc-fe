import { FormProvider } from 'react-hook-form';
import { Link } from 'react-router';

import { routes } from '@app/Router/routes';
import { Stepper } from '@views/components/app/Stepper';

import { AccountInfo } from './steps/AccountInfo';
import { OrganizationInfo } from './steps/OrganizationInfo';
import { PersonalInfo } from './steps/PersonalInfo';
import { useRegisterController } from './useRegisterController';

export function Register() {
  const { form, isLoading, handleSubmit } = useRegisterController();

  return (
    <div>
      <header className="mb-10 flex flex-col items-center gap-4">
        <h1 className="dark:text-foreground text-2xl font-semibold tracking-[-1px] text-gray-800">
          Faça o seu cadastro
        </h1>
      </header>

      <FormProvider {...form}>
        <form onSubmit={handleSubmit} className="min-h-125">
          <Stepper
            initialStep={0}
            hasHeader
            steps={[
              {
                label: 'Informações pessoais',
                content: <PersonalInfo />,
              },
              {
                label: 'Informações de login',
                content: <AccountInfo />,
              },
              {
                label: 'Organização',
                content: <OrganizationInfo isLoading={isLoading} />,
              },
            ]}
          />
        </form>
      </FormProvider>

      <footer className="mt-10 flex flex-col items-center gap-4">
        <p className="space-x-2">
          <span className="dark:text-muted-foreground tracking-[-0.5px] text-gray-700">
            Já possui uma conta?
          </span>
          <Link
            to={`/${routes.login}`}
            className="text-primary font-medium tracking-[-0.5px]"
          >
            Fazer login.
          </Link>
        </p>
      </footer>
    </div>
  );
}
