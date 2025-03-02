/*
  # Criação das tabelas iniciais para a plataforma Acolhe

  1. Novas Tabelas
    - `posts`
      - `id` (uuid, primary key)
      - `user_id` (uuid, referência ao usuário anônimo)
      - `conteudo` (text, conteúdo do post)
      - `categoria` (text, categoria do post)
      - `criacao_em` (timestamp, data de criação)
      - `curtidas` (array de UUIDs, usuários que curtiram)
      - `avatar` (text, URL do avatar do usuário)
      - `apelido` (text, apelido do usuário)
    
    - `comentarios`
      - `id` (uuid, primary key)
      - `post_id` (uuid, referência ao post)
      - `user_id` (uuid, referência ao usuário anônimo)
      - `conteudo` (text, conteúdo do comentário)
      - `criacao_em` (timestamp, data de criação)
      - `avatar` (text, URL do avatar do usuário)
      - `apelido` (text, apelido do usuário)
    
    - `favoritos`
      - `id` (uuid, primary key)
      - `user_id` (uuid, referência ao usuário anônimo)
      - `post_id` (uuid, referência ao post)
      - `criacao_em` (timestamp, data de criação)
    
    - `denuncias`
      - `id` (uuid, primary key)
      - `user_id` (uuid, referência ao usuário anônimo)
      - `conteudo_id` (uuid, referência ao conteúdo denunciado)
      - `tipo` (text, tipo de conteúdo: 'post' ou 'comentario')
      - `motivo` (text, motivo da denúncia)
      - `criacao_em` (timestamp, data de criação)
      - `status` (text, status da denúncia: 'pendente', 'aprovada', 'rejeitada')

  2. Segurança
    - Habilitar RLS em todas as tabelas
    - Adicionar políticas para garantir que usuários só possam:
      - Ver todos os posts e comentários
      - Editar/excluir apenas seus próprios posts e comentários
      - Gerenciar apenas seus próprios favoritos
*/

-- Tabela de posts
CREATE TABLE IF NOT EXISTS posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  conteudo text NOT NULL,
  categoria text NOT NULL,
  criacao_em timestamptz DEFAULT now(),
  curtidas uuid[] DEFAULT '{}',
  avatar text NOT NULL,
  apelido text NOT NULL
);

-- Tabela de comentários
CREATE TABLE IF NOT EXISTS comentarios (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  user_id uuid NOT NULL,
  conteudo text NOT NULL,
  criacao_em timestamptz DEFAULT now(),
  avatar text NOT NULL,
  apelido text NOT NULL
);

-- Tabela de favoritos
CREATE TABLE IF NOT EXISTS favoritos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  post_id uuid NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  criacao_em timestamptz DEFAULT now(),
  UNIQUE(user_id, post_id)
);

-- Tabela de denúncias
CREATE TABLE IF NOT EXISTS denuncias (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  conteudo_id uuid NOT NULL,
  tipo text NOT NULL CHECK (tipo IN ('post', 'comentario')),
  motivo text NOT NULL,
  criacao_em timestamptz DEFAULT now(),
  status text NOT NULL DEFAULT 'pendente' CHECK (status IN ('pendente', 'aprovada', 'rejeitada'))
);

-- Habilitar Row Level Security
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE comentarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE favoritos ENABLE ROW LEVEL SECURITY;
ALTER TABLE denuncias ENABLE ROW LEVEL SECURITY;

-- Políticas para posts
CREATE POLICY "Qualquer um pode ver posts"
  ON posts FOR SELECT
  USING (true);

CREATE POLICY "Usuários autenticados podem criar posts"
  ON posts FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuários podem atualizar seus próprios posts"
  ON posts FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Usuários podem excluir seus próprios posts"
  ON posts FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Políticas para comentários
CREATE POLICY "Qualquer um pode ver comentários"
  ON comentarios FOR SELECT
  USING (true);

CREATE POLICY "Usuários autenticados podem criar comentários"
  ON comentarios FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuários podem excluir seus próprios comentários"
  ON comentarios FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Políticas para favoritos
CREATE POLICY "Usuários podem ver seus próprios favoritos"
  ON favoritos FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Usuários podem adicionar favoritos"
  ON favoritos FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuários podem remover seus favoritos"
  ON favoritos FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Políticas para denúncias
CREATE POLICY "Usuários podem criar denúncias"
  ON denuncias FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuários podem ver suas próprias denúncias"
  ON denuncias FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);