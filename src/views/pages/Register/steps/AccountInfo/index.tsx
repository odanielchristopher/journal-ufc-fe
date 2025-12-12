import { useFormContext } from 'react-hook-form';

import { useStepper } from '@app/hooks/useStepper';
import {
  StepperNextButton,
  StepperPreviousButton,
} from '@views/components/app/Stepper';
import { Input } from '@views/components/ui/Input';

import type { RegisterFormData } from '../../useRegisterController';

export function AccountInfo() {
  const { register, formState, ...form } = useFormContext<RegisterFormData>();

  const { nextStep } = useStepper();

  async function handleNextStep() {
    const isValid = await form.trigger('accountInfo', {
      shouldFocus: true,
    });

    if (isValid) {
      nextStep();
    }
  }

  return (
    <div className="flex flex-col p-4">
      <div className="space-y-3">
        <Input
          placeholder="E-mail*"
          {...register('accountInfo.email')}
          error={formState.errors.accountInfo?.email?.message}
        />
        <Input
          placeholder="Confirme seu email*"
          {...register('accountInfo.confirmEmail')}
          error={formState.errors.accountInfo?.confirmEmail?.message}
        />

        <Input
          placeholder="Senha*"
          {...register('accountInfo.password')}
          error={formState.errors.accountInfo?.password?.message}
        />

        <Input
          placeholder="Confirme sua senha*"
          {...register('accountInfo.confirmPassword')}
          error={formState.errors.accountInfo?.confirmPassword?.message}
        />
      </div>

      <div className="mt-8 flex w-full items-center justify-end gap-3">
        <StepperPreviousButton type="button" className="flex-1/2">
          Anterior
        </StepperPreviousButton>
        <StepperNextButton
          type="button"
          onClick={handleNextStep}
          className="flex-1/2"
        >
          Próximo
        </StepperNextButton>
      </div>
    </div>
  );
}
