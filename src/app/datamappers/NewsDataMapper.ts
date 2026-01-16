import type { INews } from '@app/entities/News';

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

export class NewsDataMapper {
  static toPersistence(
    domainNews: Omit<INews, 'id'>,
  ): Omit<IPersistenceNews, 'publishedBy'> {
    const { title, imageUrl, description, content, publicationDate, tag } =
      domainNews;

    return {
      title,
      imageUrl,
      description,
      text: content,
      category: tag,
      publicationDate,
    };
  }

  static toDomain(persistenceNews: IPersistenceNews): INews {
    const {
      id,
      text,
      title,
      category,
      imageUrl,
      description,
      publishedBy,
      publicationDate,
    } = persistenceNews;

    return {
      id: id!,
      tag: category,
      title,
      content: text,
      imageUrl,
      description,
      publicationDate,
      editor: publishedBy,
    };
  }
}
