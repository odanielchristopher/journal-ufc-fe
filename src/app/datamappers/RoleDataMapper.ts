import type { Role } from '@app/enums/Role';

export class RoleDataMapper {
  private static map: Record<Role, string> = {
    ADMIN: 'Administrador',
    EDITOR: 'Editor',
  };

  static toDomain(role: Role): string {
    return this.map[role];
  }
}