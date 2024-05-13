import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/hooks/use-auth';
import { AuthForm } from '@/components/auth-form';

export function SignIn() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login, setTokenToSession, form, formSchema } = useAuth();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const response = await login({ ...values });

    if (response.status === 401) {
      if (response.title) {
        toast({
          title: response.title,
        });
      }
      return;
    }

    setTokenToSession(response.token);
    navigate('/');
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
      </CardHeader>
      <CardContent>
        <AuthForm form={form} onSubmit={onSubmit}>
          <Button type="submit">Sign in</Button>
          <Button variant="link" onClick={() => navigate('/auth/register')}>
            register
          </Button>
        </AuthForm>
      </CardContent>
    </Card>
  );
}
