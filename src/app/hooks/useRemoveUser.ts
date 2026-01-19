import { useMutation, useQueryClient } from '@tanstack/react-query';

import { USERS_QUERY_KEY } from '@app/config/constants';
import { usersService } from '@app/services/usersService';

export function useRemoveUser() {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: usersService.remove,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: USERS_QUERY_KEY('get-all'),
      });
    },
  });

  return {
    removeUser: mutateAsync,
    isLoading: isPending,
  };
}
