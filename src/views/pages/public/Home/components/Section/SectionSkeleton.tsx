import { ArrowLeft, ArrowRight } from 'lucide-react';

import type { NewsCardProps } from '@views/components/app/NewsCard';
import { Button } from '@views/components/ui/Button';
import { Skeleton } from '@views/components/ui/Skeleton';

export function SectionSkeleton({
  title,
  variant,
}: {
  title?: string;
  variant?: NewsCardProps['variant'];
}) {
  return variant === 'emphasis' ? (
    <Skeleton className="h-100 w-full rounded-xl bg-gray-300" />
  ) : (
    <div>
      <div className="mb-6 flex w-full items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="h-1 w-18 rounded-2xl bg-teal-700"></span>

          <h3 className="font-bold">{title}</h3>
        </div>

        <div className="relative flex gap-2">
          <Button
            type="button"
            variant="outline"
            disabled
            className="static top-1/2 -left-12 size-10 rounded-full bg-white"
          >
            <ArrowLeft />
            <span className="sr-only">Previous slide</span>
          </Button>
          <Button
            type="button"
            variant="outline"
            disabled
            className="static top-1/2 -left-12 size-10 rounded-full bg-white"
          >
            <ArrowRight />
            <span className="sr-only">Next slide</span>
          </Button>
        </div>
      </div>
      <div className="flex gap-4">
        <Skeleton className="h-120.75 w-97.5 rounded-xl bg-gray-300 sm:basis-1/2 lg:basis-1/3" />
        <Skeleton className="h-120.75 w-97.5 rounded-xl bg-gray-300 sm:basis-1/2 lg:basis-1/3" />
        <Skeleton className="h-120.75 w-97.5 rounded-xl bg-gray-300 sm:basis-1/2 lg:basis-1/3" />
      </div>
    </div>
  );
}
