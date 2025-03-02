import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuthStore } from '@/store/auth-store';
import { MessageCircle, Shield } from 'lucide-react';

export function LoginPage() {
  const { login, isAuthenticated, isLoading } = useAuthStore();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);
  
  const handleLogin = async () => {
    await login();
  };
  
  return (
    <div className="container max-w-md py-12">
      <Card className="w-full">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <MessageCircle className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-2xl">Bem-vindo ao Acolhe</CardTitle>
          <CardDescription>
            Entre anonimamente para compartilhar e receber apoio
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-muted p-4 rounded-lg flex items-start space-x-4">
            <Shield className="h-6 w-6 text-primary mt-1" />
            <div>
              <h3 className="font-medium">Sua privacidade é importante</h3>
              <p className="text-sm text-muted-foreground">
                Você permanecerá anônimo. Não coletamos informações pessoais como nome, e-mail ou localização.
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            className="w-full" 
            size="lg"
            onClick={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? 'Entrando...' : 'Entrar Anonimamente'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}