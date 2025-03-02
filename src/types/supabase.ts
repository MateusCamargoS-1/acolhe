export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      posts: {
        Row: {
          id: string
          user_id: string
          conteudo: string
          categoria: string
          criacao_em: string
          curtidas: string[]
          avatar: string
          apelido: string
        }
        Insert: {
          id?: string
          user_id: string
          conteudo: string
          categoria: string
          criacao_em?: string
          curtidas?: string[]
          avatar: string
          apelido: string
        }
        Update: {
          id?: string
          user_id?: string
          conteudo?: string
          categoria?: string
          criacao_em?: string
          curtidas?: string[]
          avatar?: string
          apelido?: string
        }
      }
      comentarios: {
        Row: {
          id: string
          post_id: string
          user_id: string
          conteudo: string
          criacao_em: string
          avatar: string
          apelido: string
        }
        Insert: {
          id?: string
          post_id: string
          user_id: string
          conteudo: string
          criacao_em?: string
          avatar: string
          apelido: string
        }
        Update: {
          id?: string
          post_id?: string
          user_id?: string
          conteudo?: string
          criacao_em?: string
          avatar?: string
          apelido?: string
        }
      }
      favoritos: {
        Row: {
          id: string
          user_id: string
          post_id: string
          criacao_em: string
        }
        Insert: {
          id?: string
          user_id: string
          post_id: string
          criacao_em?: string
        }
        Update: {
          id?: string
          user_id?: string
          post_id?: string
          criacao_em?: string
        }
      }
      denuncias: {
        Row: {
          id: string
          user_id: string
          conteudo_id: string
          tipo: string
          motivo: string
          criacao_em: string
          status: string
        }
        Insert: {
          id?: string
          user_id: string
          conteudo_id: string
          tipo: string
          motivo: string
          criacao_em?: string
          status?: string
        }
        Update: {
          id?: string
          user_id?: string
          conteudo_id?: string
          tipo?: string
          motivo?: string
          criacao_em?: string
          status?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}