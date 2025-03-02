import { Button } from '@/components/ui/button';
import { usePostsStore } from '@/store/posts-store';

const categories = [
  { value: 'todos', label: 'Todos' },
  { value: 'ansiedade', label: 'Ansiedade' },
  { value: 'depressão', label: 'Depressão' },
  { value: 'motivação', label: 'Motivação' },
  { value: 'superação', label: 'Superação' },
  { value: 'desabafo', label: 'Desabafo' },
  { value: 'gratidão', label: 'Gratidão' },
];

export function CategoryFilter() {
  const { currentFilter, setFilter } = usePostsStore();
  
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {categories.map((category) => (
        <Button
          key={category.value}
          variant={currentFilter === category.value ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter(category.value)}
          className="capitalize"
        >
          {category.label}
        </Button>
      ))}
    </div>
  );
}