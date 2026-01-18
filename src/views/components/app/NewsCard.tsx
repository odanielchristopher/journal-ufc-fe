import { CalendarIcon, Pencil, Trash2, UserIcon } from 'lucide-react';

import type { INews } from '@app/entities/News';
import { useIsMobile } from '@app/hooks/useIsMobile';
import { cn } from '@app/lib/utils';
import { capitalizeFirstLetter } from '@app/utils/capitalizeFirstLetter';
import { formatDate } from '@app/utils/formatDate';
import { Button } from '@views/components/ui/Button';

type EditCardProps = {
  news: INews;
  onEdit(): void;
  onRemove(): void;
  variant: 'edit';
};

type NormalCardProps = {
  news: INews;
  variant?: 'default' | 'emphasis';
  className?: string;
};

export type NewsCardProps = NormalCardProps | EditCardProps;

export function NewsCard(props: NewsCardProps) {
  const isMobile = useIsMobile(768);

  if (props.variant === 'edit') {
    return <EditCard {...props} />;
  }

  if (props.variant === 'emphasis' && !isMobile) {
    return <EmphasisCard {...props} />;
  }

  return <DefaultCard {...props} />;
}

export function EmphasisCard({
  news,
  isMobile,
  className,
}: NormalCardProps & { isMobile?: boolean }) {
  const {
    editor,
    description,
    imageUrl,
    publicationDate,
    category: tag,
    title,
  } = news;
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
          {capitalizeFirstLetter(tag)}
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

export function DefaultCard({ news, className }: NormalCardProps) {
  const {
    editor,
    description,
    imageUrl,
    publicationDate,
    category: tag,
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
          {capitalizeFirstLetter(tag)}
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
          {capitalizeFirstLetter(news.category)}
        </span>

        <h3 className="text-base leading-snug font-semibold">{news.title}</h3>

        <p className="text-muted-foreground line-clamp-2 text-sm">
          {news.description}
        </p>

        <span className="text-muted-foreground text-xs">
          Por {news.editor} •{' '}
          {new Date(news.publicationDate).toLocaleDateString('pt-BR')}
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
