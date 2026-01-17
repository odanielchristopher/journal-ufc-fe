export interface INews {
  id: string;
  title: string;
  imageUrl: string;
  description: string;
  content?: string;
  publicationDate: string;
  editor: string;
  tag: string;
}

export interface IPersistenceNews {
  id?: string;
  title: string;
  imageUrl: string;
  description: string;
  text?: string;
  publicationDate: string;
  publishedBy: string;
  category: string;
}
