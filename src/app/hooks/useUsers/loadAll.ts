import { useQuery } from '@tanstack/react-query';

import { USERS_QUERY_KEY } from '@app/config/constants';
import type { IUser } from '@app/entities/User';
import { usersService } from '@app/services/usersService';

import type { UseUsersOutput } from './types';

export function loadAll(): UseUsersOutput<IUser[]> {
  const { data, isFetching } = useQuery({
    queryKey: USERS_QUERY_KEY('get-all'),
    queryFn: () => usersService.getEditors(),
  });

  return {
    users: data ?? [],
    isLoading: isFetching,
  };
}
