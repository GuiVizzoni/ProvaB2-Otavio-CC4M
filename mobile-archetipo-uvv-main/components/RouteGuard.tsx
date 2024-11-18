import React, { useEffect } from 'react';
import { useRouter } from 'expo-router'; // Para navegação
import { supabase } from '@/supabase/supabase'; // Supabase configurado

interface RouteGuardProps {
  children: React.ReactNode;
}

const RouteGuard: React.FC<RouteGuardProps> = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();

      if (error || !user) {
        // Se o usuário não estiver autenticado, redireciona para a tela de login
        router.push('/PLogin');
      }
    };

    checkAuth();
  }, [router]);

  return <>{children}</>; // Renderiza as páginas protegidas
};

export default RouteGuard;
