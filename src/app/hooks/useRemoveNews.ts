import { useMutation, useQueryClient } from '@tanstack/react-query';

import { NEWS_QUERY_KEY } from '@app/config/constants';
import { newsService } from '@app/services/newsService';

export function useRemoveNews() {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: newsService.remove,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: NEWS_QUERY_KEY('get-all'),
      });
    },
  });

  return {
    removeNews: mutateAsync,
    isLoading: isPending,
  };
}
