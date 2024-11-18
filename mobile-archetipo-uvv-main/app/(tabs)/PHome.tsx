import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import RouteGuard from '@/components/RouteGuard'; // Importando o RouteGuard
import { supabase } from '@/supabase/supabase';

const PHome: React.FC = () => {
  const router = useRouter();

  // Função para fazer o logout
  const handleLogout = async () => {
    // Chama o método de logout do Supabase
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Erro ao deslogar:", error.message);
      return;
    }

    // Redireciona o usuário para a tela de login
    router.push('/PLogin');
  };

  return (
    <RouteGuard>
      <View style={styles.container}>
        <Text style={styles.title}>Bem-vindo ao Portal apenas para os logados!</Text>
        <Text style={styles.subtitle}>Você está na página inicial.</Text>

        {/* Botão de logout */}
        <TouchableOpacity onPress={handleLogout} style={styles.button}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>

        <View style={styles.fixedButtons}>
          <TouchableOpacity onPress={() => router.push('/')} style={styles.fixedButton}>
            <Text style={styles.fixedButtonText}>PInicial</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/PHome')} style={styles.fixedButton}>
            <Text style={styles.fixedButtonText}>Home</Text>
          </TouchableOpacity>
        </View>
      </View>
    </RouteGuard>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#3b5998',
    marginBottom: 40,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#3b5998',
    marginBottom: 30,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#3b5998',
    padding: 15,
    borderRadius: 5,
    marginBottom: 20,
    width: '100%',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  fixedButtons: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  fixedButton: {
    backgroundColor: '#3b5998',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  fixedButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default PHome;