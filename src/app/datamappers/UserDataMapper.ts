import type { IUser, IPersistenceUser } from '@app/entities/User';
import type { Role } from '@app/enums/Role';

export class UserDataMapper {
  static toPersistence(
    domainUser: Omit<IUser, 'id'>,
  ): Omit<IPersistenceUser, 'id'> {
    const { nickname, username, role } = domainUser;

    return {
      nickname,
      username,
      role,
    };
  }

  static toDomain(persistenceUser: IPersistenceUser): IUser {
    const { id, nickname, username, role } = persistenceUser;

    return {
      id: id!,
      nickname,
      username,
      role: role as Role,
    };
  }
}