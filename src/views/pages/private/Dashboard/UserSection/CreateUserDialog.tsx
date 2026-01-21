import { toast } from 'sonner';

import { useCreateUser } from '@app/hooks/useCreateUser';
import { UsersForm } from '@views/components/app/UsersForm';
import type { UsersFormData } from '@views/components/app/UsersForm/schema';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@views/components/ui/Dialog';

interface CreateUserDialogProps {
  isOpen: boolean;
  onClose(): void;
  onSuccess?(): void;
}

export function CreateUserDialog({
  isOpen,
  onClose,
  onSuccess,
}: CreateUserDialogProps) {
  const { createUser, isLoading } = useCreateUser();

  async function handleSubmit(formData: UsersFormData) {
    try {
      await createUser({
        ...formData,
      });

      toast.success('Usuário criado com sucesso');
      onSuccess?.();
    } catch (error) {
      console.error(error);
      toast.error('Erro ao criar usuário');
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
          <DialogTitle>Novo Usuário</DialogTitle>
        </DialogHeader>

        <UsersForm
          isLoading={isLoading}
          onSubmit={handleSubmit}
          buttonLabel="Criar usuário"
        />
      </DialogContent>
    </Dialog>
  );
}
