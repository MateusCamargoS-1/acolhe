import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from '@/lib/supabase';
import { generateRandomAvatar, generateRandomNickname } from '@/utils/user-helpers';

interface AuthState {
  userId: string | null;
  avatar: string;
  apelido: string;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: { avatar?: string; apelido?: string }) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      userId: null,
      avatar: '',
      apelido: '',
      isAuthenticated: false,
      isLoading: false,
      error: null,
      
      login: async () => {
        set({ isLoading: true, error: null });
        try {
          // Autenticação anônima com Supabase
          const { data, error } = await supabase.auth.signInAnonymously();
          
          if (error) throw error;
          
          const avatar = generateRandomAvatar();
          const apelido = generateRandomNickname();
          
          set({ 
            userId: data.user?.id || null,
            isAuthenticated: true,
            avatar,
            apelido,
            isLoading: false 
          });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Erro ao fazer login',
            isLoading: false 
          });
        }
      },
      
      logout: async () => {
        set({ isLoading: true });
        try {
          await supabase.auth.signOut();
          set({ 
            userId: null, 
            isAuthenticated: false, 
            avatar: '',
            apelido: '',
            isLoading: false 
          });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Erro ao fazer logout',
            isLoading: false 
          });
        }
      },
      
      updateProfile: (data) => {
        set({ 
          avatar: data.avatar || get().avatar,
          apelido: data.apelido || get().apelido
        });
      }
    }),
    {
      name: 'acolhe-auth-storage',
      partialize: (state) => ({ 
        userId: state.userId,
        avatar: state.avatar,
        apelido: state.apelido,
        isAuthenticated: state.isAuthenticated
      }),
    }
  )
);