import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Post } from '@/store/posts-store';
import { PostCard } from '@/components/posts/post-card';
import { CommentForm } from '@/components/comments/comment-form';
import { CommentList } from '@/components/comments/comment-list';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export function PostDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return;
      
      try {
        const { data, error } = await supabase
          .from('posts')
          .select('*')
          .eq('id', id)
          .single();
        
        if (error) throw error;
        
        setPost(data as Post);
      } catch (error) {
        setError('Não foi possível carregar o post. Ele pode ter sido removido ou não existe.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPost();
  }, [id]);
  
  if (isLoading) {
    return (
      <div className="container max-w-4xl py-12 text-center">
        <p>Carregando post...</p>
      </div>
    );
  }
  
  if (error || !post) {
    return (
      <div className="container max-w-4xl py-12">
        <Button 
          variant="ghost" 
          className="mb-6"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar
        </Button>
        
        <div className="bg-muted p-8 rounded-lg text-center">
          <h1 className="text-2xl font-bold mb-4">Post não encontrado</h1>
          <p className="text-muted-foreground mb-6">{error}</p>
          <Button onClick={() => navigate('/')}>Ir para a página inicial</Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container max-w-4xl py-6">
      <Button 
        variant="ghost" 
        className="mb-6"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Voltar
      </Button>
      
      <div className="mb-8">
        <PostCard post={post} />
      </div>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Deixe seu comentário</h2>
        <CommentForm postId={post.id} />
      </div>
      
      <div>
        <h2 className="text-xl font-semibold mb-4">Comentários</h2>
        <CommentList postId={post.id} />
      </div>
    </div>
  );
}