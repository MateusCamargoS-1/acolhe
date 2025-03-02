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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { usePostsStore } from '@/store/posts-store';
import { useAuthStore } from '@/store/auth-store';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const formSchema = z.object({
  conteudo: z
    .string()
    .min(3, { message: 'O conteúdo deve ter pelo menos 3 caracteres' })
    .max(1000, { message: 'O conteúdo deve ter no máximo 1000 caracteres' }),
  categoria: z.string({
    required_error: 'Por favor, selecione uma categoria',
  }),
});

type FormValues = z.infer<typeof formSchema>;

export function PostForm() {
  const { createPost } = usePostsStore();
  const { userId, isAuthenticated, avatar, apelido } = useAuthStore();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      conteudo: '',
      categoria: '',
    },
  });
  
  const onSubmit = async (values: FormValues) => {
    if (!isAuthenticated || !userId) {
      toast.error('Você precisa estar logado para criar um post');
      navigate('/login');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await createPost({
        user_id: userId,
        conteudo: values.conteudo,
        categoria: values.categoria,
        avatar,
        apelido,
      });
      
      form.reset();
    } catch (error) {
      toast.error('Erro ao criar post. Tente novamente.');
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
                  placeholder="Compartilhe o que você está sentindo..."
                  className="min-h-[120px] resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <FormField
            control={form.control}
            name="categoria"
            render={({ field }) => (
              <FormItem className="w-full sm:w-1/3">
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Categoria" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="ansiedade">Ansiedade</SelectItem>
                    <SelectItem value="depressão">Depressão</SelectItem>
                    <SelectItem value="motivação">Motivação</SelectItem>
                    <SelectItem value="superação">Superação</SelectItem>
                    <SelectItem value="desabafo">Desabafo</SelectItem>
                    <SelectItem value="gratidão">Gratidão</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button 
            type="submit" 
            className="w-full sm:w-auto"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Publicando...' : 'Publicar'}
          </Button>
        </div>
      </form>
    </Form>
  );
}