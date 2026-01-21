import { Calendar } from 'lucide-react';

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
      value={value} 
      onValueChange={(order: Order) => onOrderChange?.(order)} 
    >
      <SelectTrigger className="h-9 justify-between gap-2 border border-gray-300 bg-gray-100 font-normal md:w-52">
        <div className="flex items-center gap-2">
          <Calendar className="size-4 text-gray-500" />
          <SelectValue 
            placeholder="Selecione a ordem" 
            className="text-gray-3 data-[placeholder]:text-gray-500"
          />
        </div>
      </SelectTrigger>

      <SelectContent>
        <SelectItem value={Order.DESC}>Os mais recentes</SelectItem>
        <SelectItem value={Order.ASC}>Os mais antigos</SelectItem>
      </SelectContent>
    </Select>
  );
}