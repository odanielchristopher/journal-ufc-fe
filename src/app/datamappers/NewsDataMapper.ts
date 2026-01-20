import type { INews, IPersistenceNews } from '@app/entities/News';

export class NewsDataMapper {
  static toCreate(
    domainNews: Omit<INews, 'id' | 'editor'>,
  ): Omit<IPersistenceNews, 'publishedBy'> {
    const { title, imageUrl, description, content, publishedDate, category } =
      domainNews;

    return {
      title,
      imageUrl: imageUrl,
      description,
      text: content,
      category,
      publishedDate: publishedDate.toISOString(),
    };
  }

  static toUpdate(
    domainNews: Omit<INews, 'id' | 'editor' | 'publishedDate'>,
  ): Omit<IPersistenceNews, 'publishedBy' | 'publishedDate'> {
    const { title, imageUrl, description, content, category } = domainNews;

    return {
      title,
      imageUrl: imageUrl,
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
      publishedDate,
    } = persistenceNews;

    return {
      id: id!,
      category: category,
      title,
      content: text,
      imageUrl: imageUrl,
      description,
      publishedDate: new Date(publishedDate),
      editor: publishedBy,
    };
  }
}
