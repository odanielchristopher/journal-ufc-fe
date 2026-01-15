import { useNews } from '@app/hooks/useNews';

import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Section } from './components/Section';

export function Home() {
  const { news, isLoading } = useNews();

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header className="flex w-full items-center border-b-2 bg-white shadow-lg" />

      <main className="mx-auto mb-8 flex w-full max-w-7xl flex-1 flex-col gap-10 p-8">
        {Object.entries(news).map(([key, value]) => (
          <Section
            key={key}
            news={value.data}
            title={value.title}
            variant={key === 'destaque' ? 'emphasis' : 'default'}
            isLoading={isLoading}
          />
        ))}
      </main>

      <Footer className="bg-gray-800 py-10 text-white" />
    </div>
  );
}
