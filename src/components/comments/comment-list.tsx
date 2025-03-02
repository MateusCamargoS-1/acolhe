import { useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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
import { Trash, Flag } from 'lucide-react';
import { formatDate } from '@/utils/user-helpers';
import { useCommentsStore } from '@/store/comments-store';
import { useAuthStore } from '@/store/auth-store';
import { toast } from 'sonner';

interface CommentListProps {
  postId: string;
}

export function CommentList({ postId }: CommentListProps) {
  const { comments, fetchComments, deleteComment, isLoading } = useCommentsStore();
  const { userId } = useAuthStore();
  
  useEffect(() => {
    fetchComments(postId);
  }, [fetchComments, postId]);
  
  const postComments = comments[postId] || [];
  
  const handleDelete = async (commentId: string) => {
    await deleteComment(commentId, postId);
  };
  
  const handleReport = () => {
    toast.success('Denúncia enviada. Obrigado por ajudar a manter nossa comunidade segura.');
  };
  
  if (isLoading) {
    return <div className="text-center py-4">Carregando comentários...</div>;
  }
  
  if (postComments.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        Ainda não há comentários. Seja o primeiro a comentar!
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      {postComments.map((comment) => (
        <Card key={comment.id} className="overflow-hidden">
          <CardHeader className="pb-2 pt-4 px-4 flex flex-row items-start justify-between space-y-0">
            <div className="flex items-center space-x-2">
              <Avatar>
                <AvatarImage src={comment.avatar} alt={comment.apelido} />
                <AvatarFallback>{comment.apelido.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">{comment.apelido}</p>
                <p className="text-xs text-muted-foreground">{formatDate(comment.criacao_em)}</p>
              </div>
            </div>
            
            {userId === comment.user_id ? (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Trash className="h-4 w-4" />
                    <span className="sr-only">Excluir comentário</span>
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Esta ação não pode ser desfeita. Isso excluirá permanentemente seu comentário.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={() => handleDelete(comment.id)}>
                      Excluir
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            ) : (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Flag className="h-4 w-4" />
                    <span className="sr-only">Denunciar comentário</span>
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Denunciar comentário</AlertDialogTitle>
                    <AlertDialogDescription>
                      Você está prestes a denunciar este comentário. Nossa equipe irá analisar e tomar as medidas necessárias.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={handleReport}>
                      Denunciar
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </CardHeader>
          
          <CardContent className="px-4 py-2">
            <p className="whitespace-pre-line">{comment.conteudo}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}