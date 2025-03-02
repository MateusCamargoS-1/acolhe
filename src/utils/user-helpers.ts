// Gera um avatar aleatório usando o serviço DiceBear
export const generateRandomAvatar = (): string => {
  const styles = ['adventurer', 'avataaars', 'bottts', 'fun-emoji', 'lorelei', 'notionists', 'open-peeps'];
  const randomStyle = styles[Math.floor(Math.random() * styles.length)];
  const seed = Math.random().toString(36).substring(2, 10);
  
  return `https://api.dicebear.com/7.x/${randomStyle}/svg?seed=${seed}`;
};

// Lista de adjetivos e substantivos para gerar apelidos
const adjetivos = [
  'Alegre', 'Calmo', 'Gentil', 'Forte', 'Sereno', 
  'Paciente', 'Amável', 'Corajoso', 'Sincero', 'Resiliente'
];

const substantivos = [
  'Estrela', 'Oceano', 'Montanha', 'Floresta', 'Nuvem', 
  'Rio', 'Sol', 'Lua', 'Vento', 'Jardim'
];

// Gera um apelido aleatório combinando um adjetivo e um substantivo
export const generateRandomNickname = (): string => {
  const adjetivo = adjetivos[Math.floor(Math.random() * adjetivos.length)];
  const substantivo = substantivos[Math.floor(Math.random() * substantivos.length)];
  const numero = Math.floor(Math.random() * 100);
  
  return `${adjetivo}${substantivo}${numero}`;
};

// Formata a data para exibição
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) {
    return 'agora mesmo';
  }
  
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} ${diffInMinutes === 1 ? 'minuto' : 'minutos'} atrás`;
  }
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} ${diffInHours === 1 ? 'hora' : 'horas'} atrás`;
  }
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) {
    return `${diffInDays} ${diffInDays === 1 ? 'dia' : 'dias'} atrás`;
  }
  
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  };
  return date.toLocaleDateString('pt-BR', options);
};