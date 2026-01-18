import { useMutation } from '@tanstack/react-query';

import { newsService } from '@app/services/newsService';

export function useUpdateNews() {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: newsService.update,
  });

  return {
    updateNews: mutateAsync,
    isLoading: isPending,
  };
}
