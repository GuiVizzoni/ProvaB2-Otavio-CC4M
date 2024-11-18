import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Stack } from 'expo-router';
import { supabase } from '@/supabase/supabase';
import { Session, Subscription } from '@supabase/supabase-js'; // Importa o tipo Session do Supabase
import RouteGuard from '@/components/RouteGuard'; // Componente de proteção de rota

const Layout: React.FC = () => {
  const [session, setSession] = useState<Session | null>(null); // Tipagem correta para o estado de session
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session); // Atualiza corretamente com Session | null
      setLoading(false);
    };

    fetchSession();

    // Listener para mudanças na autenticação
    const { data: subscription } = supabase.auth.onAuthStateChange(
      (_, session: Session | null) => {
        setSession(session);
      }
    );

    // Função para limpar o listener ao desmontar o componente
    return () => {
      (subscription as unknown as Subscription)?.unsubscribe(); // Usa casting para garantir que unsubscribe existe
    };
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      {session ? (
        // Rotas para usuários autenticados
        <RouteGuard>
          <Stack.Screen name="(tabs)/PHome" />
        </RouteGuard>
      ) : (
        // Rotas para usuários não autenticados
        <>
          <Stack.Screen name="(tabs)/PInicial" />
          <Stack.Screen name="(tabs)/PLogin" />
          <Stack.Screen name="(tabs)/PRegistro" />
          <Stack.Screen name="(tabs)/EsqueciASenha" />
        </>
      )}
    </Stack>
  );
};

export default Layout;
