import type { IUser, IPersistenceUser } from '@app/entities/User';

export class UserDataMapper {
  static toPersistence(
    domainUser: Omit<IUser, 'id'>,
  ): Omit<IPersistenceUser, 'id'> {
    const { name, email, category } = domainUser;

    return {
      name,
      email,
      category,
    };
  }

  static toDomain(persistenceUser: IPersistenceUser): IUser {
    const { id, name, email, category } = persistenceUser;

    return {
      id: id!,
      name,
      email,
      category,
    };
  }
}