import { NEWS } from '@app/mocks/news';

import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Section } from './components/Section';

export function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header className="flex w-full items-center border-b-2 bg-white shadow-lg" />

      <main className="mx-auto mb-8 flex w-full max-w-7xl flex-1 flex-col gap-10 p-8">
        <Section news={NEWS} variant="emphasis" />

        <Section news={NEWS} title="Pesquisa e Inovação" />

        <Section news={NEWS} title="Extensão Universitária" />
      </main>

      <Footer className="bg-gray-800 py-10 text-white" />
    </div>
  );
}
