export interface IPersistenceAuth {
  token: string;
}

export interface IDomainAuth {
  accessToken: string;
}

export class AuthDataMapper {
  static toDomain(persistenceNews: IPersistenceAuth): IDomainAuth {
    const { token } = persistenceNews;

    return {
      accessToken: token,
    };
  }
}
