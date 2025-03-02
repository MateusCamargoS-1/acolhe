import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageCircle, Heart, Shield, Users } from 'lucide-react';

export function AboutPage() {
  return (
    <div className="container max-w-4xl py-12">
      <div className="text-center mb-12">
        <MessageCircle className="h-16 w-16 mx-auto mb-4 text-primary" />
        <h1 className="text-4xl font-bold mb-4">Sobre o Acolhe</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Uma plataforma de suporte emocional anônima, criada para oferecer um espaço seguro onde todos podem compartilhar sentimentos e receber apoio.
        </p>
      </div>
      
      <div className="grid gap-8 md:grid-cols-3 mb-12">
        <Card>
          <CardHeader className="text-center">
            <Shield className="h-12 w-12 mx-auto mb-2 text-primary" />
            <CardTitle>Anonimato</CardTitle>
            <CardDescription>
              Sua privacidade é nossa prioridade
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              No Acolhe, você pode expressar seus sentimentos sem revelar sua identidade. Não coletamos dados pessoais e você pode escolher um avatar e apelido aleatórios.
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="text-center">
            <Heart className="h-12 w-12 mx-auto mb-2 text-primary" />
            <CardTitle>Apoio</CardTitle>
            <CardDescription>
              Receba e ofereça suporte emocional
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              Compartilhe suas experiências, desafios e conquistas. Conecte-se com pessoas que estão passando por situações semelhantes e ofereça palavras de conforto.
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="text-center">
            <Users className="h-12 w-12 mx-auto mb-2 text-primary" />
            <CardTitle>Comunidade</CardTitle>
            <CardDescription>
              Um ambiente seguro e acolhedor
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              Nossa comunidade é baseada no respeito mútuo e empatia. Moderamos o conteúdo para garantir que todos se sintam seguros e respeitados.
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="bg-muted p-8 rounded-lg text-center mb-12">
        <h2 className="text-2xl font-bold mb-4">Nossa Missão</h2>
        <p className="text-lg mb-6 max-w-2xl mx-auto">
          Criar um espaço onde as pessoas possam expressar seus sentimentos livremente, sem julgamentos, e encontrar apoio emocional em momentos difíceis.
        </p>
        <Button asChild>
          <Link to="/">Junte-se à nossa comunidade</Link>
        </Button>
      </div>
      
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Contato</h2>
        <p className="mb-4">
          Se você tiver dúvidas, sugestões ou precisar de ajuda, entre em contato conosco.
        </p>
        <p className="text-muted-foreground">
          contato@acolhe.com
        </p>
      </div>
    </div>
  );
}