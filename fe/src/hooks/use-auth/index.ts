import { useMutation } from 'react-query';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { postLogin, postRegister } from '@/api';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
  email: z.string().min(1).email('Invalid email format'),
  password: z.string().min(6).max(50),
});

export const useAuth = () => {
  const { mutateAsync: login } = useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      return await postLogin(email, password);
    },
  });

  const { mutateAsync: register } = useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      return await postRegister(email, password);
    },
  });

  const setTokenToSession = (token: string) => {
    sessionStorage.setItem('token', token);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  return {
    form,
    formSchema,
    login,
    register,
    setTokenToSession,
  };
};
