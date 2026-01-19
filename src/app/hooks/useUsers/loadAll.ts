import { useQuery } from '@tanstack/react-query';

import { USERS_QUERY_KEY } from '@app/config/constants';
import type { IUser } from '@app/entities/User';
import { UsersService, usersService } from '@app/services/usersService';

import type { UseUsersOutput } from './types';

export function loadAll(
  input: UsersService.GetAllParams = {},
): UseUsersOutput<IUser[]> {
  const { data, isFetching } = useQuery({
    queryKey: USERS_QUERY_KEY('get-all'),
    queryFn: () => usersService.getAll(input),
  });

  return {
    users: data ?? [],
    isLoading: isFetching,
  };
}