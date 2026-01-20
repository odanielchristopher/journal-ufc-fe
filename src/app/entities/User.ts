import type { Role } from '@app/enums/Role';

export interface IUser {
  id: string;
  nickname: string;
  username: string;
  role: Role;
}

export interface IPersistenceUser {
  id?: string;
  nickname: string;
  username: string;
  role: string;
}