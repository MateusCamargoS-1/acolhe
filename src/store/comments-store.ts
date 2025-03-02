import { create } from 'zustand';
import { supabase } from '@/lib/supabase';
// import { useAuthStore } from './auth-store';
import { toast } from 'sonner';

export interface Comment {
  id: string;
  post_id: string;
  user_id: string;
  conteudo: string;
  criacao_em: string;
  avatar: string;
  apelido: string;
}

interface CommentsState {
  comments: Record<string, Comment[]>; // post_id -> comments[]
  isLoading: boolean;
  error: string | null;
  fetchComments: (postId: string) => Promise<void>;
  createComment: (comment: Omit<Comment, 'id' | 'criacao_em'>) => Promise<void>;
  deleteComment: (commentId: string, postId: string) => Promise<void>;
}

export const useCommentsStore = create<CommentsState>((set) => ({
  comments: {},
  isLoading: false,
  error: null,
  
  fetchComments: async (postId) => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('comentarios')
        .select('*')
        .eq('post_id', postId)
        .order('criacao_em', { ascending: true });
      
      if (error) throw error;
      
      set((state) => ({ 
        comments: { 
          ...state.comments, 
          [postId]: data as Comment[] 
        },
        isLoading: false 
      }));
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Erro ao buscar comentários',
        isLoading: false 
      });
    }
  },
  
  createComment: async (comment) => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('comentarios')
        .insert(comment)
        .select();
      
      if (error) throw error;
      
      const newComment = data[0] as Comment;
      
      set((state) => ({ 
        comments: { 
          ...state.comments, 
          [comment.post_id]: [
            ...(state.comments[comment.post_id] || []),
            newComment
          ]
        },
        isLoading: false 
      }));
      
      toast.success('Comentário adicionado');
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Erro ao criar comentário',
        isLoading: false 
      });
      toast.error('Erro ao adicionar comentário');
    }
  },
  
  deleteComment: async (commentId, postId) => {
    try {
      const { error } = await supabase
        .from('comentarios')
        .delete()
        .eq('id', commentId);
      
      if (error) throw error;
      
      set((state) => ({
        comments: {
          ...state.comments,
          [postId]: state.comments[postId]?.filter(c => c.id !== commentId) || []
        }
      }));
      
      toast.success('Comentário removido');
    } catch (error) {
      toast.error('Erro ao remover comentário');
    }
  }
}));