import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { newsFormSchema, type NewsFormData } from './schema';

export interface IUseNewsFormController {
  defaultValues?: NewsFormData;
  onSubmit?(formData: NewsFormData): void;
}

export function useNewsFormController({
  defaultValues,
  onSubmit,
}: IUseNewsFormController = {}) {
  const { register, formState, ...form } = useForm<NewsFormData>({
    defaultValues: {
      title: defaultValues?.title ?? '',
      imageUrl: defaultValues?.imageUrl ?? '',
      content: defaultValues?.content ?? '',
      description: defaultValues?.description ?? '',
      category: defaultValues?.category ?? undefined,
    },
    resolver: zodResolver(newsFormSchema),
  });

  const handleSubmit = form.handleSubmit((formData) => {
    onSubmit?.(formData);
  });

  return {
    register,
    form,
    formState,
    handleSubmit,
  };
}
