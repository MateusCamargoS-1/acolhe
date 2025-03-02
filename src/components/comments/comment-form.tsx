import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { useCommentsStore } from '@/store/comments-store';
import { useAuthStore } from '@/store/auth-store';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const formSchema = z.object({
  conteudo: z
    .string()
    .min(3, { message: 'O comentário deve ter pelo menos 3 caracteres' })
    .max(500, { message: 'O comentário deve ter no máximo 500 caracteres' }),
});

type FormValues = z.infer<typeof formSchema>;

interface CommentFormProps {
  postId: string;
}

export function CommentForm({ postId }: CommentFormProps) {
  const { createComment } = useCommentsStore();
  const { userId, isAuthenticated, avatar, apelido } = useAuthStore();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      conteudo: '',
    },
  });
  
  const onSubmit = async (values: FormValues) => {
    if (!isAuthenticated || !userId) {
      toast.error('Você precisa estar logado para comentar');
      navigate('/login');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await createComment({
        post_id: postId,
        user_id: userId,
        conteudo: values.conteudo,
        avatar,
        apelido,
      });
      
      form.reset();
    } catch (error) {
      toast.error('Erro ao adicionar comentário. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="conteudo"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="Deixe seu comentário..."
                  className="min-h-[80px] resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="flex justify-end">
          <Button 
            type="submit" 
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Enviando...' : 'Enviar comentário'}
          </Button>
        </div>
      </form>
    </Form>
  );
}