import { create } from 'zustand';
import { supabase } from '@/lib/supabase';
import { useAuthStore } from './auth-store';
import { toast } from 'sonner';

export interface Post {
  id: string;
  user_id: string;
  conteudo: string;
  categoria: string;
  criacao_em: string;
  curtidas: string[];
  avatar: string;
  apelido: string;
}

interface PostsState {
  posts: Post[];
  isLoading: boolean;
  error: string | null;
  currentFilter: string;
  fetchPosts: (categoria?: string) => Promise<void>;
  createPost: (post: Omit<Post, 'id' | 'criacao_em' | 'curtidas'>) => Promise<void>;
  likePost: (postId: string) => Promise<void>;
  deletePost: (postId: string) => Promise<void>;
  setFilter: (filter: string) => void;
}

export const usePostsStore = create<PostsState>((set, get) => ({
  posts: [],
  isLoading: false,
  error: null,
  currentFilter: 'todos',
  
  fetchPosts: async (categoria) => {
    set({ isLoading: true, error: null });
    try {
      let query = supabase
        .from('posts')
        .select('*')
        .order('criacao_em', { ascending: false });
      
      if (categoria && categoria !== 'todos') {
        query = query.eq('categoria', categoria);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      
      set({ posts: data as Post[], isLoading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Erro ao buscar posts',
        isLoading: false 
      });
    }
  },
  
  
  createPost: async (post) => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('posts')
        .insert({
          ...post,
          curtidas: [],
        })
        .select();
      
      if (error) throw error;
      
      set((state) => ({ 
        posts: [data[0] as Post, ...state.posts],
        isLoading: false 
      }));
      
      toast.success('Post criado com sucesso!');
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Erro ao criar post',
        isLoading: false 
      });
      toast.error('Erro ao criar post');
    }
  },
  
  likePost: async (postId) => {
    const userId = useAuthStore.getState().userId;
    if (!userId) return;
    
    try {
      const post = get().posts.find(p => p.id === postId);
      if (!post) return;
      
      const alreadyLiked = post.curtidas.includes(userId);
      const newLikes = alreadyLiked
        ? post.curtidas.filter(id => id !== userId)
        : [...post.curtidas, userId];
      
      const { error } = await supabase
        .from('posts')
        .update({ curtidas: newLikes })
        .eq('id', postId);
      
      if (error) throw error;
      
      set((state) => ({
        posts: state.posts.map(p => 
          p.id === postId ? { ...p, curtidas: newLikes } : p
        )
      }));
    } catch (error) {
      toast.error('Erro ao reagir ao post');
    }
  },
  
  deletePost: async (postId) => {
    try {
      const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', postId);
      
      if (error) throw error;
      
      set((state) => ({
        posts: state.posts.filter(p => p.id !== postId)
      }));
      
      toast.success('Post removido com sucesso');
    } catch (error) {
      toast.error('Erro ao remover post');
    }
  },
  
  setFilter: (filter) => {
    set({ currentFilter: filter });
    get().fetchPosts(filter === 'todos' ? undefined : filter);
  }
}));
