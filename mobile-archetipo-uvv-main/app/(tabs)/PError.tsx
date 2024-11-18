import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from '@/supabase/supabase'; // Supabase configurado

const PError: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    // Verifica se o usuário está logado
    const checkUser = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();

      if (error) {
        console.log("Erro ao obter usuário:", error.message);
      }

      if (!user) {
        // Se não estiver logado, redireciona para a tela de login
        router.push('/PLogin');
      } else if (!user.email_confirmed_at) {
        // Se o e-mail não for verificado
        alert('Por favor, verifique seu e-mail para completar o cadastro.');
      }
    };

    checkUser();
  }, [router]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Erro de Verificação</Text>
      <Text style={styles.message}>
        O seu e-mail não foi verificado ou você não está logado. Por favor, verifique sua caixa de entrada ou faça login novamente.
      </Text>

      <TouchableOpacity onPress={() => router.push('/PLogin')} style={styles.button}>
        <Text style={styles.buttonText}>Voltar para o Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#f3f4f6',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#3b5998',
    textAlign: 'center',
    marginBottom: 20,
  },
  message: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#3b5998',
    padding: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default PError;
