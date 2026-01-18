import { useParams, useNavigate } from 'react-router';
import { loadById } from '../../../../app/hooks/useNews/loadById';

export type ViewNewsParams = {
  newsId: string;
};

export function useViewNewsParams() {
  const navigate = useNavigate();
  const { newsId } = useParams<ViewNewsParams>();
  const handleBack = () => navigate(-1);
  const { news, isLoading } = loadById({
    id: newsId || '',
  });

  return {
    data: news,
    isLoading,
    handleBack,
  };
}
