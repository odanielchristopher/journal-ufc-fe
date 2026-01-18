import { Order } from '@app/enums/Order';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/Select';

interface OrderSelectProps {
  value?: Order;
  onOrderChange?(order: Order): void;
}

export function OrderSelect({ value, onOrderChange }: OrderSelectProps) {
  return (
    <Select
      defaultValue={value?.toString()}
      onValueChange={(order: keyof typeof Order) =>
        onOrderChange?.(Order[order])
      }
    >
      <SelectTrigger className="h-9 justify-between gap-2 border border-gray-300 bg-gray-100 font-normal md:w-52">
        <SelectValue placeholder="Selecione a ordem" />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value={Order.DESC}>Os mais recentes</SelectItem>
        <SelectItem value={Order.ASC}>Os mais antigos</SelectItem>
      </SelectContent>
    </Select>
  );
}
