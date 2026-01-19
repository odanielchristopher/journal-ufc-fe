import type { Category } from '@app/enums/Category';

export class CategoryDataMapper {
  private static map: Record<Category, string> = {
    COMUNIDADE: 'Comunidade',
    DESTAQUE: 'Destaque',
    ENSINO: 'Ensino',
    EVENTOS: 'Eventos',
    EXTENSAO: 'Extensão',
    PESQUISA: 'Pesquisa',
  };

  static toDomain(category: Category): string {
    return this.map[category];
  }
}
