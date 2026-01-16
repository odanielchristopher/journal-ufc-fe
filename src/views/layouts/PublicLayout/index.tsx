import { Outlet } from 'react-router';

import { Footer } from './components/Footer';
import { Header } from './components/Header';

export function PublicLayout() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header className="flex w-full items-center border-b-2 bg-white shadow-lg" />

      <div className="mx-auto w-full max-w-7xl flex-1">
        <Outlet />
      </div>

      <Footer className="bg-gray-800 py-10 text-white" />
    </div>
  );
}
