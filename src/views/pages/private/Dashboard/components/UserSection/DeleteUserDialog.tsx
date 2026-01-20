import { toast } from 'sonner';

import { useRemoveUser } from '@app/hooks/useRemoveUser';
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

interface DeleteUserDialogProps {
  userId: number | null;
  isOpen: boolean;
  onClose(): void;
  onSuccess?(): void;
}

export function DeleteUserDialog({
  userId,
  isOpen,
  onClose,
  onSuccess,
}: DeleteUserDialogProps) {
  const { removeUser, isLoading } = useRemoveUser();

  async function handleDelete() {
    if (!userId) return;

    try {
        await removeUser({ id: userId });
      toast.success('Usuário removido com sucesso');
      onSuccess?.();
    } catch (error) {
      console.error(error);
      toast.error('Erro ao remover usuário');
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
            Essa ação é irreversível. Você realmente deseja apagar este usuário?
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