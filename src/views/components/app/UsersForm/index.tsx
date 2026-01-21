import { Controller } from 'react-hook-form';

import { Button } from '@views/components/ui/Button';
import { Input } from '@views/components/ui/Input';

import { RoleSelect } from '../RoleSelect';

import {
  useUsersFormController,
  type IUseUsersFormController,
} from './useUsersFormController';

interface UsersFormProps extends IUseUsersFormController {
  defaultValues?: any;
  isLoading?: boolean;
  buttonLabel: string;
}

export function UsersForm({
  buttonLabel,
  isLoading,
  ...props
}: UsersFormProps) {
  const { control, errors, handleSubmit, register } =
    useUsersFormController(props);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        placeholder="Nome do usuário*"
        {...register('nickname')}
        className="bg-white"
        error={errors.nickname?.message}
      />

      <Input
        placeholder="Email do usuário*"
        {...register('username')}
        className="bg-white"
        error={errors.username?.message}
      />

      <Input
        type="password"
        placeholder="Senha*"
        {...register('password')}
        className="bg-white"
        error={errors.password?.message}
      />

      <Controller
        control={control}
        name="role"
        render={({ field: { onChange, value } }) => (
          <RoleSelect
            value={value}
            placeholder="Perfil do usuário*"
            onSelect={onChange}
            error={errors.role?.message}
          />
        )}
      />

      <Button
        type="submit"
        className="mt-4 w-full"
        disabled={isLoading}
        isLoading={isLoading}
      >
        {buttonLabel}
      </Button>
    </form>
  );
}
