import { toast } from 'sonner';

import type { INews } from '@app/entities/News';
import { useUpdateNews } from '@app/hooks/useUpdateNews';
import { NewsForm } from '@views/components/app/NewsForm';
import type { NewsFormData } from '@views/components/app/NewsForm/schema';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@views/components/ui/Dialog';

interface UpdateNewsDialogProps {
  news: INews;
  isOpen: boolean;
  onClose(): void;
}

export function EditNewsDialog({
  news,
  isOpen,
  onClose,
}: UpdateNewsDialogProps) {
  const { updateNews, isLoading } = useUpdateNews();

  async function handleSubmit(formData: NewsFormData) {
    try {
      await updateNews({
        ...formData,
        id: news.id,
      });

      toast.success('Edição concluída com sucesso');
    } catch (error) {
      console.error(error);
      toast.error('Erro ao editar postagem');
    } finally {
      onClose();
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="w-[50vw] max-w-none sm:max-w-none"
        aria-describedby={undefined}
      >
        <DialogHeader>
          <DialogTitle>Editar postagem</DialogTitle>
        </DialogHeader>

        <NewsForm
          defaultValues={news}
          isLoading={isLoading}
          onSubmit={handleSubmit}
          buttonLabel="Editar postagem"
        />
      </DialogContent>
    </Dialog>
  );
}