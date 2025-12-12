import { Controller, useFormContext } from 'react-hook-form';

import { StepperPreviousButton } from '@views/components/app/Stepper';
import { Button } from '@views/components/ui/Button';
import { Input } from '@views/components/ui/Input';
import { InputAvatar } from '@views/components/ui/InputAvatar';

import type { RegisterFormData } from '../../useRegisterController';

export function OrganizationInfo({ isLoading }: { isLoading?: boolean }) {
  const { register, formState, ...form } = useFormContext<RegisterFormData>();

  return (
    <div className="flex flex-col p-4">
      <div className="flex w-full flex-col items-center">
        <Controller
          control={form.control}
          name="organizationInfo.avatar"
          render={({ field: { onChange, value } }) => (
            <InputAvatar value={value} onChange={onChange} />
          )}
        />

        <div className="mt-8 w-full space-y-3">
          <Input
            placeholder="Nome da sua organização"
            {...register('organizationInfo.name')}
            error={formState.errors.organizationInfo?.name?.message}
          />
        </div>
      </div>

      <div className="mt-8 flex w-full items-center justify-end gap-3">
        <StepperPreviousButton type="button" className="flex-1/2">
          Anterior
        </StepperPreviousButton>
        <Button
          type="submit"
          className="flex-1/2 rounded-md"
          disabled={!formState.isValid || isLoading}
          isLoading={isLoading}
        >
          Criar conta
        </Button>
      </div>
    </div>
  );
}
