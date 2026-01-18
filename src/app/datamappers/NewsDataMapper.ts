import type { INews, IPersistenceNews } from '@app/entities/News';

export class NewsDataMapper {
  static toCreate(
    domainNews: Omit<INews, 'id' | 'editor'>,
  ): Omit<IPersistenceNews, 'publishedBy'> {
    const { title, imageUrl, description, content, publicationDate, category } =
      domainNews;

    return {
      title,
      imageUrl,
      description,
      text: content,
      category,
      publicationDate: publicationDate.toISOString(),
    };
  }

  static toUpdate(
    domainNews: Omit<INews, 'id' | 'editor' | 'publicationDate'>,
  ): Omit<IPersistenceNews, 'publishedBy' | 'publicationDate'> {
    const { title, imageUrl, description, content, category } = domainNews;

    return {
      title,
      imageUrl,
      description,
      category,
      text: content,
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
      category: category,
      title,
      content: text,
      imageUrl,
      description,
      publicationDate: new Date(publicationDate),
      editor: publishedBy,
    };
  }
}
