import type { INews, IPersistenceNews } from '@app/entities/News';

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
