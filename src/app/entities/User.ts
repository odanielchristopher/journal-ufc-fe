export enum Category {
  ADMIN = 'ADMIN',
  EDITOR = 'EDITOR'
};

export interface IUser {
  id: string;
  name: string;
  email: string;
  category: Category;
}

export interface IPersistenceUser {
  id?: string;
  name: string;
  email: string;
  category: Category;
}
