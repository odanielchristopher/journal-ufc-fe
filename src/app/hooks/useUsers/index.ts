import type { IUser } from '@app/entities/User';
import { UsersService } from '@app/services/usersService';
import { loadAll } from '../useUsers/loadAll';
import type { UseUsersOutput } from './types';

export function useUsers(
  input?: UsersService.GetAllParams,
): UseUsersOutput<IUser[]> {
  return loadAll(input);
}
