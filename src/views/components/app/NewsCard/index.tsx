import type { INews } from '@app/entities/News';
import { useIsMobile } from '@app/hooks/useIsMobile';

import { DefaultCard } from './variants/DefaultCard';
import { EditCard } from './variants/EditCard';
import { EmphasisCard } from './variants/EmphasisCard';

export type EditCardProps = {
  news: INews;
  onEdit(): void;
  onRemove(): void;
  variant: 'edit';
};

export type NormalCardProps = {
  news: INews;
  variant?: 'default' | 'emphasis';
  className?: string;
};

export type NewsCardProps = NormalCardProps | EditCardProps;

export function NewsCard(props: NewsCardProps) {
  const isMobile = useIsMobile(768);

  if (props.variant === 'edit') {
    return <EditCard {...props} />;
  }

  if (props.variant === 'emphasis' && !isMobile) {
    return <EmphasisCard {...props} />;
  }

  return <DefaultCard {...props} />;
}
