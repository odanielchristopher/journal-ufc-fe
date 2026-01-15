import { CalendarIcon, UserIcon } from 'lucide-react';

import type { INews } from '@app/entities/News';
import { useIsMobile } from '@app/hooks/useIsMobile';
import { cn } from '@app/lib/utils';
import { capitalizeFirstLetter } from '@app/utils/capitalizeFirstLetter';
import { formatDate } from '@app/utils/formatDate';
import { Button } from '@views/components/ui/Button';

export interface NewsCardProps {
  news: INews;
  variant?: 'default' | 'emphasis';
  className?: string;
}

export function NewsCard(props: NewsCardProps) {
  const isMobile = useIsMobile(768);

  if (props.variant === 'emphasis' && !isMobile) {
    return <EmphasisCard {...props} />;
  }

  return <DefaultCard {...props} />;
}

export function EmphasisCard({
  news,
  isMobile,
  className,
}: NewsCardProps & { isMobile?: boolean }) {
  const { editor, description, imageUrl, publicationDate, tag, title } = news;
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
          {capitalizeFirstLetter(tag.name)}
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

export function DefaultCard({ news, className }: NewsCardProps) {
  const { editor, description, imageUrl, publicationDate, tag, title } = news;

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
          {capitalizeFirstLetter(tag.name)}
        </span>
      </div>

      <div className="flex flex-col items-start justify-between p-6">
        <strong className="mb-4 line-clamp-2 text-lg">{title}</strong>

        <p className="mb-4 line-clamp-2">{description}</p>

        <div className="mb-4 flex items-center gap-6">
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
