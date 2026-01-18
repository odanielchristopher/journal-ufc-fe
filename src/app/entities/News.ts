import type { Category } from '@app/enums/Category';

export interface INews {
  id: number;
  title: string;
  imageUrl: string;
  description: string;
  content?: string;
  publicationDate: string;
  editor: string;
  category: Category;
}

export interface IPersistenceNews {
  id?: number;
  title: string;
  imageUrl: string;
  description: string;
  text?: string;
  publicationDate: string;
  publishedBy: string;
  category: Category;
}
