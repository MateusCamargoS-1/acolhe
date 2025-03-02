import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Heart, MessageCircle, MoreVertical, Flag, Trash } from 'lucide-react';
import { formatDate } from '@/utils/user-helpers';
import { Post, usePostsStore } from '@/store/posts-store';
import { useAuthStore } from '@/store/auth-store';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

interface PostCardProps {
  post: Post;
  commentCount?: number; 
}

export function PostCard({ post, commentCount }: PostCardProps) {
  const { userId } = useAuthStore();
  const { likePost, deletePost } = usePostsStore();
  const navigate = useNavigate();
  
  const [isLiked, setIsLiked] = useState(post.curtidas.includes(userId || ''));
  const [likeCount, setLikeCount] = useState(post.curtidas.length);

  const handleLike = async () => {
    if (!userId) {
      toast.error('Você precisa estar logado para reagir a um post');
      navigate('/login');
      return;
    }
    
    await likePost(post.id);
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
  };
  
  const handleDelete = async () => {
    await deletePost(post.id);
  };
  
  const handleReport = () => {
    toast.success('Denúncia enviada. Obrigado por ajudar a manter nossa comunidade segura.');
  };
  
  const isOwner = userId === post.user_id;
  
  return (
    <Card className="mb-4 overflow-hidden">
      <CardHeader className="pb-2 pt-4 px-4 flex flex-row items-start justify-between space-y-0">
        <div className="flex items-center space-x-2">
          <Avatar>
            <AvatarImage src={post.avatar} alt={post.apelido} />
            <AvatarFallback>{post.apelido.substring(0, 2)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">{post.apelido}</p>
            <p className="text-xs text-muted-foreground">{formatDate(post.criacao_em)}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Badge variant="secondary" className="capitalize">
            {post.categoria}
          </Badge>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
                <span className="sr-only">Mais opções</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {isOwner ? (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-destructive">
                      <Trash className="mr-2 h-4 w-4" />
                      Excluir
                    </DropdownMenuItem>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Esta ação não pode ser desfeita. Isso excluirá permanentemente seu post.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction onClick={handleDelete}>Excluir</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              ) : (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-destructive">
                      <Flag className="mr-2 h-4 w-4" />
                      Denunciar
                    </DropdownMenuItem>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Denunciar conteúdo</AlertDialogTitle>
                      <AlertDialogDescription>
                        Você está prestes a denunciar este conteúdo. Nossa equipe irá analisar e tomar as medidas necessárias.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction onClick={handleReport}>Denunciar</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      
      <CardContent className="px-4 py-2">
        <p className="whitespace-pre-line">{post.conteudo}</p>
      </CardContent>
      
      <CardFooter className="px-4 py-3 flex justify-between border-t">
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="sm" 
            className={`flex items-center gap-1 ${isLiked ? 'text-red-500' : ''}`}
            onClick={handleLike}
          >
            <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
            <span>{likeCount}</span>
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex items-center gap-1"
            asChild
          >
            <Link to={`/post/${post.id}`}>
              <MessageCircle className="h-4 w-4" />
              <span>Comentar</span>
            </Link>
          </Button>
          
          <div className="text-sm text-muted-foreground">
            {commentCount} {commentCount === 1 ? 'comentário' : 'comentários'}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
