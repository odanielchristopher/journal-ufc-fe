import { useMutation } from '@tanstack/react-query';

import { newsService } from '@app/services/newsService';

export function useRemoveNews() {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: newsService.remove,
  });

  return {
    removeNews: mutateAsync,
    isLoading: isPending,
  };
}
