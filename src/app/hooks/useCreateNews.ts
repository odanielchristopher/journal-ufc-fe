import { useMutation } from '@tanstack/react-query';

import { newsService } from '@app/services/newsService';

export function useCreateNews() {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: newsService.create,
  });

  return {
    createNews: mutateAsync,
    isLoading: isPending,
  };
}
