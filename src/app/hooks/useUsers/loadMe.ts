import { useQuery } from '@tanstack/react-query';

import { USERS_QUERY_KEY } from '@app/config/constants';
import type { IUser } from '@app/entities/User';
import { usersService } from '@app/services/usersService';

import type { UseUsersOutput } from './types';

export function loadMe(): UseUsersOutput<IUser | undefined> {
  const { data: users, isFetching } = useQuery({
    queryKey: USERS_QUERY_KEY('me'),
    queryFn: () => usersService.me(),
  });

  return {
    users,
    isLoading: isFetching,
  };
}
