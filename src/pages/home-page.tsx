import { useEffect, useState } from 'react';
import { PostForm } from '@/components/posts/post-form';
import { PostCard } from '@/components/posts/post-card';
import { CategoryFilter } from '@/components/posts/category-filter';
import { usePostsStore } from '@/store/posts-store';
import { useAuthStore } from '@/store/auth-store';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export function HomePage() {
  const { posts, fetchPosts } = usePostsStore();
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  
  const [localPosts, setLocalPosts] = useState(posts);
  const [isFetchingNewPosts, setIsFetchingNewPosts] = useState(false);

  useEffect(() => {
    const fetchAndComparePosts = async () => {
      setIsFetchingNewPosts(true);
      await fetchPosts();
      const newPosts = usePostsStore.getState().posts;
      setIsFetchingNewPosts(false);

      if (newPosts.length !== posts.length || !newPosts.every((post, index) => post.id === posts[index]?.id)) {
        setLocalPosts(newPosts);
      }
    };

    fetchAndComparePosts();

    const interval = setInterval(fetchAndComparePosts, 5000);

    return () => clearInterval(interval);
  }, [posts, fetchPosts]);

  return (
    <div className="container max-w-4xl py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Bem-vindo ao Acolhe</h1>
        <p className="text-muted-foreground">
          Um espaço seguro para compartilhar seus sentimentos e receber apoio.
        </p>
      </div>
      
      {isAuthenticated ? (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Compartilhe o que você está sentindo</h2>
          <PostForm />
        </div>
      ) : (
        <div className="bg-muted p-6 rounded-lg mb-8 text-center">
          <h2 className="text-xl font-semibold mb-2">Junte-se à nossa comunidade</h2>
          <p className="mb-4">
            Entre para compartilhar seus sentimentos e conectar-se com pessoas que entendem o que você está passando.
          </p>
          <Button onClick={() => navigate('/login')}>Entrar Anonimamente</Button>
        </div>
      )}
      
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Explore publicações</h2>
        <CategoryFilter />
      </div>
      
      {isFetchingNewPosts ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Atualizando publicações...</p>
        </div>
      ) : localPosts.length > 0 ? (
        <div>
          {localPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-muted rounded-lg">
          <p className="text-muted-foreground mb-2">Nenhuma publicação encontrada.</p>
          {isAuthenticated && (
            <p>Seja o primeiro a compartilhar algo!</p>
          )}
        </div>
      )}
    </div>
  );
}
