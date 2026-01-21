import { useMutation, useQueryClient } from '@tanstack/react-query';

import { NEWS_QUERY_KEY } from '@app/config/constants';
import { newsService } from '@app/services/newsService';

export function useCreateNews() {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: newsService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: NEWS_QUERY_KEY('get-all'),
      });
    },
  });

  return {
    createNews: mutateAsync,
    isLoading: isPending,
  };
}
