import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { userSchema, type UsersFormData } from './schema';

export interface IUseUsersFormController {
  defaultValues?: UsersFormData;
  onSubmit(formData: UsersFormData): void | Promise<void>;
}

export function useUsersFormController({
  defaultValues,
  onSubmit,
}: IUseUsersFormController) {
  const form = useForm<UsersFormData>({
    defaultValues: {
      nickname: defaultValues?.nickname ?? '',
      username: defaultValues?.username ?? '',
      role: defaultValues?.role ?? undefined,
    },
    resolver: zodResolver(userSchema),
  });

  const handleSubmit = form.handleSubmit(async (formData) => {
    await onSubmit(formData);
  });

  return {
    control: form.control,
    register: form.register,
    errors: form.formState.errors,
    handleSubmit,
  };
}
