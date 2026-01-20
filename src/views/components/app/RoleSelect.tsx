import { EditIcon, ShieldIcon } from 'lucide-react';

import { Role } from '@app/enums/Role';

import { FieldError } from '../ui/FieldError';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/Select';

interface RoleSelectProps {
  value?: Role;
  error?: string;
  placeholder?: string;
  onSelect?(role: Role): void;
}

export function RoleSelect({
  value,
  error,
  placeholder,
  onSelect,
}: RoleSelectProps) {
  return (
    <div className="relative">
      <Select
        defaultValue={value}
        onValueChange={(role: keyof typeof Role) => onSelect?.(Role[role])}
      >
        <SelectTrigger className="h-12! w-full bg-white">
          <SelectValue placeholder={placeholder ?? 'Selecione o perfil'} />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value={Role.ADMIN}>
            <ShieldIcon className="text-teal-700" />
            Administrador
          </SelectItem>
          <SelectItem value={Role.EDITOR}>
            <EditIcon className="text-amber-500" />
            Editor
          </SelectItem>
        </SelectContent>
      </Select>

      {error && <FieldError message={error} />}
    </div>
  );
}
