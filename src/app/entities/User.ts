import type { Role } from '@app/enums/Role';

export interface IUser {
  id: string;
  nickname: string; // name
  username: string; // email
  role: Role;
}
