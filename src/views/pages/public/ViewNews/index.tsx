import { useViewNewsParams } from './useViewNewsParams';

export function ViewNews() {
  const { newsId } = useViewNewsParams();

  return (
    <div className="flex-1">
      <h1>Tela de ver notícia de número: {newsId}</h1>
    </div>
  );
}
