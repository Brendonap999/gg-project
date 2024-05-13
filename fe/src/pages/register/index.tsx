import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

import { z } from 'zod';

import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/hooks/use-auth';
import { AuthForm } from '@/components/auth-form';

export function Register() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { register, form, formSchema } = useAuth();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await register({ ...values });
      toast({
        title: 'Successfully registered! Please sign in.',
      });

      navigate('/auth/sign-in');
    } catch (error) {
      toast({
        title: 'failed to register',
      });
    }
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Register</CardTitle>
      </CardHeader>
      <CardContent>
        <AuthForm form={form} onSubmit={onSubmit}>
          <Button type="submit">Register</Button>
          <Button variant="link" onClick={() => navigate('/auth/sign-in')}>
            Go to sign in
          </Button>
        </AuthForm>
      </CardContent>
    </Card>
  );
}
