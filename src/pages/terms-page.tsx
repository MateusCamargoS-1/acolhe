import { Link } from 'react-router-dom';

export function TermsPage() {
  return (
    <div className="container max-w-4xl py-12">
      <h1 className="text-3xl font-bold mb-6">Termos de Uso</h1>
      
      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <p>
          Bem-vindo ao Acolhe. Ao acessar ou usar nossa plataforma, você concorda com estes Termos de Uso. Por favor, leia-os cuidadosamente.
        </p>
        
        <h2>1. Aceitação dos Termos</h2>
        <p>
          Ao acessar ou usar o Acolhe, você concorda em cumprir e estar vinculado a estes Termos de Uso. Se você não concordar com qualquer parte destes termos, não poderá acessar ou usar nossos serviços.
        </p>
        
        <h2>2. Alterações nos Termos</h2>
        <p>
          Reservamo-nos o direito de modificar estes termos a qualquer momento. As alterações entrarão em vigor imediatamente após a publicação dos termos atualizados. Seu uso continuado da plataforma após tais alterações constitui sua aceitação dos novos termos.
        </p>
        
        <h2>3. Privacidade</h2>
        <p>
          Respeitamos sua privacidade. Nossa <Link to="/privacidade" className="text-primary hover:underline">Política de Privacidade</Link> descreve como coletamos, usamos e protegemos suas informações.
        </p>
        
        <h2>4. Contas de Usuário</h2>
        <p>
          O Acolhe oferece autenticação anônima. Você é responsável por manter a confidencialidade de sua conta e por todas as atividades que ocorrem sob sua conta.
        </p>
        
        <h2>5. Conduta do Usuário</h2>
        <p>
          Ao usar o Acolhe, você concorda em não:
        </p>
        <ul>
          <li>Publicar conteúdo que seja ilegal, abusivo, difamatório, pornográfico, ameaçador, invasivo da privacidade de outra pessoa, ou de outra forma ofensivo</li>
          <li>Assediar, intimidar ou ameaçar outros usuários</li>
          <li>Personificar qualquer pessoa ou entidade</li>
          <li>Usar a plataforma para fins ilegais ou não autorizados</li>
          <li>Interferir na operação normal da plataforma</li>
          <li>Coletar ou armazenar dados pessoais de outros usuários</li>
        </ul>
        
        <h2>6. Conteúdo do Usuário</h2>
        <p>
          Você mantém todos os direitos sobre o conteúdo que publica no Acolhe. No entanto, ao publicar conteúdo, você concede ao Acolhe uma licença mundial, não exclusiva, isenta de royalties para usar, reproduzir, modificar, adaptar, publicar, traduzir e distribuir esse conteúdo em qualquer mídia.
        </p>
        
        <h2>7. Moderação de Conteúdo</h2>
        <p>
          Reservamo-nos o direito de remover qualquer conteúdo que viole estes termos ou que consideremos inadequado. Podemos suspender ou encerrar contas de usuários que violem repetidamente estes termos.
        </p>
        
        <h2>8. Limitação de Responsabilidade</h2>
        <p>
          O Acolhe não é um substituto para aconselhamento profissional de saúde mental. Em caso de crise ou emergência, procure ajuda profissional imediatamente.
        </p>
        <p>
          O Acolhe e seus afiliados não serão responsáveis por quaisquer danos indiretos, incidentais, especiais, consequenciais ou punitivos decorrentes do uso ou incapacidade de usar a plataforma.
        </p>
        
        <h2>9. Lei Aplicável</h2>
        <p>
          Estes termos serão regidos e interpretados de acordo com as leis do Brasil, sem considerar seus conflitos de princípios legais.
        </p>
        
        <h2>10. Contato</h2>
        <p>
          Se você tiver alguma dúvida sobre estes Termos de Uso, entre em contato conosco em contato@acolhe.com.
        </p>
        
        <p className="mt-8">
          Última atualização: {new Date().toLocaleDateString('pt-BR')}
        </p>
      </div>
    </div>
  );
}