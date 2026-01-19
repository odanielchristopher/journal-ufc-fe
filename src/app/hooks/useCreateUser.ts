import { useMutation, useQueryClient } from '@tanstack/react-query';

import { USERS_QUERY_KEY } from '@app/config/constants';
import { usersService } from '@app/services/usersService';

export function useCreateUser() {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: usersService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: USERS_QUERY_KEY('get-all'),
      });
    },
  });

  return {
    createUser: mutateAsync,
    isLoading: isPending,
  };
}
