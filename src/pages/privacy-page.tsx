// import { Link } from 'react-router-dom';

export function PrivacyPage() {
  return (
    <div className="container max-w-4xl py-12">
      <h1 className="text-3xl font-bold mb-6">Política de Privacidade</h1>
      
      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <p>
          Sua privacidade é importante para nós. Esta Política de Privacidade explica como o Acolhe coleta, usa e protege suas informações quando você usa nossa plataforma.
        </p>
        
        <h2>1. Informações que Coletamos</h2>
        <p>
          O Acolhe é uma plataforma anônima. Coletamos o mínimo de informações necessárias para fornecer nossos serviços:
        </p>
        <ul>
          <li>Um identificador único anônimo gerado quando você se registra</li>
          <li>Conteúdo que você publica na plataforma</li>
          <li>Informações sobre como você usa a plataforma (páginas visitadas, tempo gasto, etc.)</li>
          <li>Informações técnicas como endereço IP, tipo de navegador e dispositivo</li>
        </ul>
        <p>
          <strong>Não coletamos:</strong> Seu nome real, endereço de e-mail, número de telefone, endereço físico ou outras informações de identificação pessoal, a menos que você opte por fornecê-las.
        </p>
        
        <h2>2. Como Usamos Suas Informações</h2>
        <p>
          Usamos as informações coletadas para:
        </p>
        <ul>
          <li>Fornecer, manter e melhorar nossa plataforma</li>
          <li>Personalizar sua experiência</li>
          <li>Moderar conteúdo e garantir a segurança da comunidade</li>
          <li>Analisar como nossa plataforma é usada</li>
          <li>Comunicar-nos com você sobre atualizações ou mudanças em nossos serviços</li>
        </ul>
        
        <h2>3. Compartilhamento de Informações</h2>
        <p>
          Não vendemos, trocamos ou transferimos suas informações para terceiros, exceto nas seguintes circunstâncias:
        </p>
        <ul>
          <li>Com provedores de serviços que nos ajudam a operar nossa plataforma (como serviços de hospedagem)</li>
          <li>Quando exigido por lei ou para proteger nossos direitos</li>
          <li>Em caso de fusão, venda ou aquisição de todos ou parte de nossos ativos</li>
        </ul>
        
        <h2>4. Segurança</h2>
        <p>
          Implementamos medidas de segurança para proteger suas informações contra acesso, alteração, divulgação ou destruição não autorizados. No entanto, nenhum método de transmissão pela Internet ou método de armazenamento eletrônico é 100% seguro.
        </p>
        
        <h2>5. Seus Direitos</h2>
        <p>
          Você tem o direito de:
        </p>
        <ul>
          <li>Acessar, corrigir ou excluir suas informações</li>
          <li>Retirar seu consentimento a qualquer momento</li>
          <li>Solicitar a portabilidade de seus dados</li>
          <li>Opor-se ao processamento de seus dados</li>
        </ul>
        <p>
          Para exercer esses direitos, entre em contato conosco em contato@acolhe.com.
        </p>
        
        <h2>6. Cookies e Tecnologias Semelhantes</h2>
        <p>
          Usamos cookies e tecnologias semelhantes para melhorar sua experiência, analisar o tráfego e personalizar o conteúdo. Você pode controlar o uso de cookies através das configurações do seu navegador.
        </p>
        
        <h2>7. Alterações nesta Política</h2>
        <p>
          Podemos atualizar esta política periodicamente. Notificaremos você sobre quaisquer alterações publicando a nova política de privacidade nesta página.
        </p>
        
        <h2>8. Contato</h2>
        <p>
          Se você tiver alguma dúvida sobre esta Política de Privacidade, entre em contato conosco em contato@acolhe.com.
        </p>
        
        <p className="mt-8">
          Última atualização: {new Date().toLocaleDateString('pt-BR')}
        </p>
      </div>
    </div>
  );
}