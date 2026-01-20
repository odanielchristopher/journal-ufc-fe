import type { Category } from '@app/enums/Category';

export interface INews {
  id: number;
  title: string;
  imageUrl: string;
  description: string;
  content: string;
  publishedDate: Date;
  editor: string;
  category: Category;
}

export interface IPersistenceNews {
  id?: number;
  title: string;
  imageUrl: string;
  description: string;
  text: string;
  publishedDate: string;
  publishedBy: string;
  category: Category;
}
