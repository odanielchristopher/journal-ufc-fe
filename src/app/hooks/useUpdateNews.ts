import { useMutation, useQueryClient } from '@tanstack/react-query';

import { NEWS_QUERY_KEY } from '@app/config/constants';
import { newsService } from '@app/services/newsService';

export function useUpdateNews() {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: newsService.update,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: NEWS_QUERY_KEY('get-all'),
      });
    },
  });

  return {
    updateNews: mutateAsync,
    isLoading: isPending,
  };
}
