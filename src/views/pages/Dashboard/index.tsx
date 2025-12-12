import { UserDropdownMenu } from '@views/components/app/UserDropdownMenu';

export function Dashboard() {
  return (
    <div>
      <header className="flex h-20 w-full items-center justify-between border-b p-6">
        <h1 className="text-2xl font-bold">Bem-vindo(a)!</h1>

        <UserDropdownMenu />
      </header>

      <main className="grid grid-cols-1 gap-3 p-4 min-[500px]:grid-cols-2 md:grid-cols-3 md:p-8 lg:grid-cols-4">
        asdasd
      </main>
    </div>
  );
}
