import { useMemo } from 'react';
import { Calendar, User, Tag, ArrowLeft } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { useViewNewsParams } from './useViewNewsParams';
import { ViewNewsSkeleton } from './components/SectionSkeleton';

export function ViewNews() {
  const { data, handleBack, isLoading } = useViewNewsParams();
  // vou deixar essa formatacao de data aqui mesmo, nao sei como ela realmente vai ser passada no front
  const formattedDate = useMemo(() => {
    if (!data?.publicationDate) return '';
    return new Date(data.publicationDate).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  }, [data?.publicationDate]);

  if (isLoading) {
    return <ViewNewsSkeleton />;
  }

  if (!data) return null;

  return (
    <article className="animate-fade-in mx-auto max-w-4xl px-4 py-8">
      <Button
        type="button"
        variant="ghost"
        size="lg"
        onClick={handleBack}
        className="group mb-8 flex h-auto items-center gap-3 pl-0 text-gray-500 hover:bg-transparent hover:text-gray-900"
      >
        <div className="rounded-full bg-gray-100 p-2.5 transition-colors group-hover:bg-gray-200">
          <ArrowLeft className="h-6 w-6" />
        </div>
        <span className="text-lg font-medium">Voltar para notícias</span>
      </Button>

      <header className="mb-8">
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 rounded-full bg-teal-700 px-4 py-1.5 text-xs font-medium text-white shadow-sm">
            <Tag className="h-3 w-3" />
            <span className="tracking-wide uppercase">{data.category}</span>
          </div>
        </div>

        <h1 className="mb-6 text-3xl leading-tight font-medium text-gray-900 md:text-4xl lg:text-5xl">
          {data.title}
        </h1>

        <div className="flex flex-wrap items-center gap-6 border-b border-gray-100 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span className="font-medium">{data.editor}</span>
          </div>

          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <time>{formattedDate}</time>
          </div>
        </div>
      </header>

      <div className="group relative mb-10 aspect-video overflow-hidden rounded-2xl shadow-xl">
        <img
          src={data.imageUrl}
          alt={data.title}
          className="h-full w-full transform object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />
      </div>

      <div className="prose prose-lg prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-blue-600 hover:prose-a:text-blue-800 prose-img:rounded-xl max-w-none">
        <div className="not-prose mb-8 flex gap-4">
          <div className="w-1.5 shrink-0 rounded-full bg-teal-700" />
          <p className="m-0 text-xl font-medium text-gray-600 italic">
            {data.description}
          </p>
        </div>

        <div className="space-y-6 text-justify">
          {data.content ? (
            data.content.split('\n').map(
              (paragraph, index) =>
                paragraph.trim() && (
                  <p key={index} className="leading-relaxed">
                    {paragraph}
                  </p>
                ),
            )
          ) : (
            <p className="text-gray-500">{data.content}</p>
          )}
        </div>
      </div>
    </article>
  );
}
