import { Section } from './components/Section';
import { useHomeController } from './useHomeController';

export function Home() {
  const { news, isLoading } = useHomeController();

  return (
    <main className="mx-auto mb-8 flex w-full max-w-7xl flex-1 flex-col gap-10 p-8">
      {Object.entries(news).map(([key, value]) => (
        <Section
          key={key}
          news={value.data}
          title={value.title}
          variant={key === 'DESTAQUE' ? 'emphasis' : 'default'}
          isLoading={isLoading}
        />
      ))}
    </main>
  );
}
