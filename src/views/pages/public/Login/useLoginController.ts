// import { randomUUID } from 'node:crypto';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { useAuth } from '@app/hooks/useAuth';
import { authService } from '@app/services/authService';

import { type LoginData, loginSchema } from './schema';

export function useLoginController() {
  const {
    handleSubmit: hookFormHandleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

  const { mutateAsync: login, isPending: isLoading } = useMutation({
    mutationFn: authService.signin,
  });

  const { signin, signedIn } = useAuth();

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      const { accessToken } = await login(data);
      signin(accessToken);
    } catch {
      toast.error('Credenciais inválidas!');
    }
  });

  return {
    errors,
    signedIn,
    isLoading,
    register,
    handleSubmit,
  };
}
