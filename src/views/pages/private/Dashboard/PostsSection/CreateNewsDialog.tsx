import { toast } from 'sonner';

import { useCreateNews } from '@app/hooks/useCreateNews';
import { NewsForm } from '@views/components/app/NewsForm';
import type { NewsFormData } from '@views/components/app/NewsForm/schema';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@views/components/ui/Dialog';

interface CreateNewsDialogProps {
  isOpen: boolean;
  onClose(): void;
}

export function CreateNewsDialog({ isOpen, onClose }: CreateNewsDialogProps) {
  const { createNews, isLoading } = useCreateNews();

  async function handleSubmit(formData: NewsFormData) {
    try {
      await createNews({
        ...formData,
        publishedDate: new Date(),
      });

      toast.success('Postagem concluída com sucesso');
    } catch (error) {
      console.error(error);
      toast.error('Erro ao criar postagem');
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="w-[50vw] max-w-none sm:max-w-none"
        aria-describedby={undefined}
      >
        <DialogHeader>
          <DialogTitle>Nova Postagem</DialogTitle>
        </DialogHeader>

        <NewsForm
          isLoading={isLoading}
          onSubmit={handleSubmit}
          buttonLabel="Criar nova postagem"
        />
      </DialogContent>
    </Dialog>
  );
}
