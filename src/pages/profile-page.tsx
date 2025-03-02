import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
import { useAuthStore } from '@/store/auth-store';
import { generateRandomAvatar, generateRandomNickname } from '@/utils/user-helpers';
import { RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

export function ProfilePage() {
  const { userId, avatar, apelido, updateProfile, logout } = useAuthStore();
  const navigate = useNavigate();
  const [newAvatar, setNewAvatar] = useState(avatar);
  const [newApelido, setNewApelido] = useState(apelido);
  const [isEditing, setIsEditing] = useState(false);
  
  const handleLogout = async () => {
    await logout();
    navigate('/');
  };
  
  const handleSaveProfile = () => {
    updateProfile({
      avatar: newAvatar,
      apelido: newApelido,
    });
    setIsEditing(false);
    toast.success('Perfil atualizado com sucesso!');
  };
  
  const generateNewAvatar = () => {
    setNewAvatar(generateRandomAvatar());
  };
  
  const generateNewNickname = () => {
    setNewApelido(generateRandomNickname());
  };
  
  return (
    <div className="container max-w-md py-12">
      <Card className="w-full">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Seu Perfil</CardTitle>
          <CardDescription>
            Gerencie seu perfil anônimo
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col items-center space-y-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src={isEditing ? newAvatar : avatar} alt={apelido} />
              <AvatarFallback>{apelido.substring(0, 2)}</AvatarFallback>
            </Avatar>
            
            {isEditing && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={generateNewAvatar}
                className="flex items-center gap-2"
              >
                <RefreshCw className="h-4 w-4" />
                Gerar novo avatar
              </Button>
            )}
          </div>
          
          {isEditing ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="apelido">Apelido</Label>
                <div className="flex gap-2">
                  <Input
                    id="apelido"
                    value={newApelido}
                    onChange={(e) => setNewApelido(e.target.value)}
                  />
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={generateNewNickname}
                  >
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="pt-4 flex justify-between">
                <Button 
                  variant="outline"
                  onClick={() => {
                    setIsEditing(false);
                    setNewAvatar(avatar);
                    setNewApelido(apelido);
                  }}
                >
                  Cancelar
                </Button>
                <Button onClick={handleSaveProfile}>
                  Salvar alterações
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Apelido</Label>
                <p className="text-lg font-medium">{apelido}</p>
              </div>
              
              <div className="space-y-2">
                <Label>ID Anônimo</Label>
                <p className="text-sm text-muted-foreground font-mono">{userId}</p>
                <p className="text-xs text-muted-foreground">
                  Este é seu identificador único anônimo. Ele não revela sua identidade real.
                </p>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          {!isEditing && (
            <Button 
              className="w-full" 
              onClick={() => setIsEditing(true)}
            >
              Editar perfil
            </Button>
          )}
          
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button 
                variant="outline" 
                className="w-full text-destructive hover:text-destructive"
              >
                Sair da conta
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
                <AlertDialogDescription>
                  Ao sair, você perderá acesso a esta identidade anônima. Você precisará criar uma nova ao entrar novamente.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction onClick={handleLogout}>
                  Sair
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardFooter>
      </Card>
    </div>
  );
}