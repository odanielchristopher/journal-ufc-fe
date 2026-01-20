import type { IUser } from '@app/entities/User';

import { loadAll } from '../useUsers/loadAll';

import type { UseUsersOutput } from './types';

export function useUsers(): UseUsersOutput<IUser[]> {
  return loadAll();
}
