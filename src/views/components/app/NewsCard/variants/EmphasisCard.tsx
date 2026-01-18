import { CalendarIcon, UserIcon } from 'lucide-react';

import { CategoryDataMapper } from '@app/datamappers/CategoryDataMapper';
import { cn } from '@app/lib/utils';
import { formatDate } from '@app/utils/formatDate';
import { Button } from '@views/components/ui/Button';

import type { NormalCardProps } from '..';

export function EmphasisCard({
  news,
  isMobile,
  className,
}: NormalCardProps & { isMobile?: boolean }) {
  const { editor, description, imageUrl, publicationDate, category, title } =
    news;

  return (
    <article
      className={cn(
        'bg-card flex h-full rounded-xl transition-all hover:-translate-y-1',
        className,
      )}
    >
      <div
        className={cn(
          'relative flex-1/2 rounded-l-xl',
          !isMobile && 'h-64 md:h-full',
        )}
      >
        <img
          src={imageUrl}
          alt="Noticia"
          className="h-full rounded-l-xl object-cover"
        />

        <span className="absolute top-3 left-3 rounded-sm bg-teal-600 px-5 py-2 font-semibold text-white">
          {CategoryDataMapper.toDomain(category)}
        </span>
      </div>

      <div className="flex flex-1/2 flex-col items-start justify-between p-4 md:p-10">
        <strong className="text-lg">{title}</strong>

        <p>{description}</p>

        <div className="flex flex-wrap items-center gap-6">
          <span className="text-muted-foreground flex items-center gap-3 leading-1">
            <CalendarIcon /> {formatDate(new Date(publicationDate))}
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
