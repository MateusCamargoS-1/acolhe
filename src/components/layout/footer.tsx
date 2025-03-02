import { Link } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <MessageCircle className="h-6 w-6" />
          <p className="text-center text-sm leading-loose md:text-left">
            &copy; {new Date().getFullYear()} Acolhe. Todos os direitos reservados.
          </p>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
          <Link to="/sobre" className="text-sm font-medium hover:underline underline-offset-4">
            Sobre
          </Link>
          <Link to="/termos" className="text-sm font-medium hover:underline underline-offset-4">
            Termos de Uso
          </Link>
          <Link to="/privacidade" className="text-sm font-medium hover:underline underline-offset-4">
            Privacidade
          </Link>
        </div>
      </div>
    </footer>
  );
}