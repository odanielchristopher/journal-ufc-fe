import { Link } from 'react-router';

import type { INews } from '@app/entities/News';
import { cn } from '@app/lib/utils';
import { routes } from '@app/Router/routes';
import { NewsCard, type NewsCardProps } from '@views/components/app/NewsCard';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@views/components/ui/Carousel';

import { SectionSkeleton } from './SectionSkeleton';

interface SectionProps {
  news: INews[];
  title?: string;
  variant?: NewsCardProps['variant'];
  isLoading?: boolean;
}

export function Section({ news, variant, title, isLoading }: SectionProps) {
  if (isLoading) {
    return <SectionSkeleton title={title} variant={variant} />;
  }

  if (news.length < 1) return null;

  return (
    <Carousel
      opts={{
        align: 'start',
        showDots: variant === 'emphasis',
        dotsClassName: {
          activeDot: 'bg-teal-700',
        },
      }}
    >
      {title && (
        <div className="mb-6 flex w-full items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="h-1 w-18 rounded-2xl bg-teal-700"></span>

            <h3 className="font-bold">{title}</h3>
          </div>

          <div className="relative flex gap-2">
            <CarouselPrevious
              type="button"
              className="static size-10 translate-y-0 bg-white"
            />
            <CarouselNext
              type="button"
              className="static size-10 translate-y-0 bg-white"
            />
          </div>
        </div>
      )}

      <CarouselContent className="px-2">
        {news.map((content) => (
          <CarouselItem
            key={content.id}
            className={cn(
              variant !== 'emphasis' && 'sm:basis-1/2 lg:basis-1/3',
            )}
          >
            <Link to={`${routes.news}/${content.id}`}>
              <NewsCard
                news={content}
                variant={variant === 'emphasis' ? 'emphasis' : 'default'}
              />
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
