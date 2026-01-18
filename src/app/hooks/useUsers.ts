import { useQuery } from '@tanstack/react-query';

import { USERS_QUERY_KEY } from '@app/config/constants';
import { usersService } from '@app/services/usersService';

export function useUsers() {
  const { data, isFetching } = useQuery({
    queryKey: USERS_QUERY_KEY('get-all'),
    queryFn: usersService.getEditors,
  });

  return {
    users: data ?? [],
    isLoading: isFetching,
  };
}
