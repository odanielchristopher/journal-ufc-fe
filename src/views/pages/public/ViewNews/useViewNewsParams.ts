import { useParams } from 'react-router';

export type ViewNewsParams = {
  newsId: string;
};

export function useViewNewsParams() {
  const params = useParams<ViewNewsParams>();

  if (!params)
    throw new Error('This page need news id! Please config routes correctly');

  return params as ViewNewsParams;
}
