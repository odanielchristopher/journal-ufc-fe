import { CalendarIcon, UserIcon } from 'lucide-react';

import { CategoryDataMapper } from '@app/datamappers/CategoryDataMapper';
import { cn } from '@app/lib/utils';
import { formatDate } from '@app/utils/formatDate';
import { Button } from '@views/components/ui/Button';

import type { NormalCardProps } from '..';

export function DefaultCard({ news, className }: NormalCardProps) {
  const {
    editor,
    description,
    imageUrl,
    publishedDate: publicationDate,
    category,
    title,
  } = news;

  return (
    <article
      className={cn(
        'hover flex h-full cursor-pointer flex-col overflow-hidden rounded-xl bg-white transition-all hover:-translate-y-1',
        className,
      )}
    >
      <div className="relative h-full w-full">
        <img
          src={imageUrl}
          alt="Noticia"
          className="h-full w-full rounded-t-xl object-cover"
        />

        <span className="absolute top-3 left-3 rounded-sm bg-teal-600 px-5 py-2 font-semibold text-white">
          {CategoryDataMapper.toDomain(category)}
        </span>
      </div>

      <div className="flex flex-col items-start justify-between p-6">
        <strong className="mb-4 line-clamp-2 text-lg">{title}</strong>

        <p className="mb-4 line-clamp-2">{description}</p>

        <div className="mb-4 flex items-center gap-6">
          <span className="text-muted-foreground flex items-center gap-3 leading-1">
            <CalendarIcon /> {formatDate(publicationDate)}
          </span>

          <span className="text-muted-foreground flex items-center gap-3 leading-1">
            <UserIcon />
            {editor}
          </span>
        </div>

        <Button type="button" className="px-6 text-base">
          Ler mais
        </Button>
      </div>
    </article>
  );
}
