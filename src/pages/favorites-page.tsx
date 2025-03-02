import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Post } from '@/store/posts-store';
import { PostCard } from '@/components/posts/post-card';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/auth-store';
import { toast } from 'sonner';

export function FavoritesPage() {
  const { userId, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    const fetchFavorites = async () => {
      try {
        // Primeiro, buscar os IDs dos posts favoritos
        const { data: favoritesData, error: favoritesError } = await supabase
          .from('favoritos')
          .select('post_id')
          .eq('user_id', userId);
        
        if (favoritesError) throw favoritesError;
        
        if (!favoritesData || favoritesData.length === 0) {
          setFavorites([]);
          setIsLoading(false);
          return;
        }
        
        // Extrair os IDs dos posts
        const postIds = favoritesData.map(fav => fav.post_id);
        
        // Buscar os posts completos
        const { data: postsData, error: postsError } = await supabase
          .from('posts')
          .select('*')
          .in('id', postIds);
        
        if (postsError) throw postsError;
        
        setFavorites(postsData as Post[]);
      } catch (error) {
        toast.error('Erro ao carregar favoritos');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchFavorites();
  }, [userId, isAuthenticated, navigate]);
  
  return (
    <div className="container max-w-4xl py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Seus Favoritos</h1>
        <p className="text-muted-foreground">
          Posts que você salvou para ler mais tarde.
        </p>
      </div>
      
      {isLoading ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Carregando favoritos...</p>
        </div>
      ) : favorites.length > 0 ? (
        <div>
          {favorites.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-muted rounded-lg">
          <p className="text-muted-foreground mb-4">Você ainda não tem posts favoritos.</p>
          <Button onClick={() => navigate('/')}>Explorar posts</Button>
        </div>
      )}
    </div>
  );
}