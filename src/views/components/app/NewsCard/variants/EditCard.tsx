import { Pencil, Trash2 } from 'lucide-react';

import { CategoryDataMapper } from '@app/datamappers/CategoryDataMapper';
import { Button } from '@views/components/ui/Button';

import type { EditCardProps } from '..';

export function EditCard({ news, onEdit, onRemove }: EditCardProps) {
  return (
    <div className="flex items-start gap-4 rounded-lg border border-gray-200 bg-white p-4 transition hover:bg-gray-50">
      <img
        src={news.imageUrl}
        alt={news.title}
        className="h-24 w-40 rounded-md object-cover"
      />

      <div className="flex flex-1 flex-col gap-1">
        <span className="w-fit rounded-full bg-green-100 px-3 py-0.5 text-xs font-medium text-green-700">
          {CategoryDataMapper.toDomain(news.category)}
        </span>

        <h3 className="text-base leading-snug font-semibold">{news.title}</h3>

        <p className="text-muted-foreground line-clamp-2 text-sm">
          {news.description}
        </p>

        <span className="text-muted-foreground text-xs">
          Por {news.editor} • {news.publishedDate.toLocaleDateString('pt-BR')}
        </span>
      </div>

      <div className="flex gap-2">
        <Button type="button" variant="ghost" size="icon" onClick={onEdit}>
          <Pencil className="size-4" />
        </Button>
        <Button type="button" variant="ghost" size="icon" onClick={onRemove}>
          <Trash2 className="size-4 text-red-500" />
        </Button>
      </div>
    </div>
  );
}
