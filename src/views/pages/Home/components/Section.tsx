import type { INews } from '@app/entities/News';
import { cn } from '@app/lib/utils';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@views/components/ui/Carousel';

import { NewsCard, type NewsCardProps } from './NewsCard';

interface SectionProps {
  news: INews[];
  title?: string;
  variant?: NewsCardProps['variant'];
}

export function Section({ news, variant, title }: SectionProps) {
  return (
    <Carousel
      opts={{
        align: 'start',
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
            <NewsCard news={content} variant={variant} />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
