import { toast } from 'sonner';

import { useRemoveNews } from '@app/hooks/useRemoveNews';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@views/components/ui/AlertDialog';

interface DeleteNewsDialogProps {
  newsId: number | null;
  isOpen: boolean;
  onClose(): void;
}

export function DeleteNewsDialog({
  newsId,
  isOpen,
  onClose,
}: DeleteNewsDialogProps) {
  const { removeNews, isLoading } = useRemoveNews();

  async function handleDelete() {
    if (!newsId) return;

    try {
      await removeNews({ id: newsId.toString() });
      toast.success('Postagem removida com sucesso');
    } catch (error) {
      console.error(error);
      toast.error('Erro ao remover postagem');
    } finally {
      onClose();
    }
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
          <AlertDialogDescription>
            Essa ação é irreversível. Você realmente deseja apagar esta
            postagem?
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            disabled={isLoading}
            className="bg-red-600 hover:bg-red-700"
            onClick={handleDelete}
          >
            {isLoading ? 'Removendo...' : 'Apagar'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
