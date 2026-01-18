import { Skeleton } from '../../../../components/ui/Skeleton';

export function ViewNewsSkeleton() {
  return (
    <article className="mx-auto max-w-4xl px-4 py-8">
      <div className="mb-8 flex items-center gap-3">
        <Skeleton className="h-11 w-11 rounded-full bg-gray-200" />
        <Skeleton className="h-6 w-40 rounded-md bg-gray-200" />
      </div>

      <header className="mb-8">
        <div className="mb-4">
          <Skeleton className="h-7 w-28 rounded-full bg-gray-200" />
        </div>

        <div className="mb-6 space-y-2">
          <Skeleton className="h-9 w-full rounded-lg bg-gray-200 md:h-12" />
          <Skeleton className="h-9 w-3/4 rounded-lg bg-gray-200 md:h-12" />
        </div>

        <div className="flex gap-6 border-b border-gray-100 pb-8">
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-4 rounded bg-gray-200" />
            <Skeleton className="h-4 w-24 rounded bg-gray-200" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-4 rounded bg-gray-200" />
            <Skeleton className="h-4 w-24 rounded bg-gray-200" />
          </div>
        </div>
      </header>

      <Skeleton className="mb-10 aspect-video w-full rounded-2xl bg-gray-300" />

      <div className="max-w-none">
        <div className="mb-8 flex gap-4">
          <Skeleton className="h-24 w-1.5 shrink-0 rounded-full bg-gray-300" />
          <div className="w-full space-y-3 py-1">
            <Skeleton className="h-5 w-full bg-gray-200" />
            <Skeleton className="h-5 w-full bg-gray-200" />
            <Skeleton className="h-5 w-2/3 bg-gray-200" />
          </div>
        </div>

        <div className="space-y-8">
          <div className="space-y-2.5">
            <Skeleton className="h-4 w-full bg-gray-200" />
            <Skeleton className="h-4 w-full bg-gray-200" />
            <Skeleton className="h-4 w-11/12 bg-gray-200" />
            <Skeleton className="h-4 w-full bg-gray-200" />
          </div>

          <div className="space-y-2.5">
            <Skeleton className="h-4 w-full bg-gray-200" />
            <Skeleton className="h-4 w-full bg-gray-200" />
            <Skeleton className="h-4 w-3/4 bg-gray-200" />
          </div>
        </div>
      </div>
    </article>
  );
}
