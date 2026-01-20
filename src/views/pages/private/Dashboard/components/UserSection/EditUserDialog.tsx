import { toast } from 'sonner';

import type { IUser } from '@app/entities/User';
import { useUpdateUser } from '@app/hooks/useUpdateUser';
import { UsersForm } from '@views/components/app/UsersForm';
import type { UsersFormData } from '@views/components/app/UsersForm/schema';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@views/components/ui/Dialog';

interface EditUserDialogProps {
  user: IUser;
  isOpen: boolean;
  onClose(): void;
  onSuccess?(): void;
}

export function EditUserDialog({
  user,
  isOpen,
  onClose,
  onSuccess,
}: EditUserDialogProps) {
  const { updateUser, isLoading } = useUpdateUser();

  async function handleSubmit(formData: UsersFormData) {
    try {
      await updateUser({
        ...formData,
        id: user.id,
      });

      toast.success('Edição concluída com sucesso');
      onSuccess?.();
    } catch (error) {
      console.error(error);
      toast.error('Erro ao editar usuário');
    } finally {
      onClose();
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="w-[95vw] max-w-[640px] sm:w-full"
        aria-describedby={undefined}
      >
        <DialogHeader>
          <DialogTitle>Editar usuário</DialogTitle>
        </DialogHeader>

        <UsersForm
          defaultValues={user}
          isLoading={isLoading}
          onSubmit={handleSubmit}
          buttonLabel="Editar usuário"
        />
      </DialogContent>
    </Dialog>
  );
}