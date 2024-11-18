import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from '@/supabase/supabase'; // Supabase configurado

const PLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    setErrorMessage('');
    setLoading(true);

    // Tenta fazer o login com email e senha
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);

    if (error) {
      setErrorMessage('Erro ao entrar. Verifique suas credenciais.');
      Alert.alert('Erro', 'Erro ao entrar. Verifique suas credenciais.');
    } else if (data.user && !data.user.email_confirmed_at) {
      // Caso o e-mail não tenha sido confirmado
      router.push('/(tabs)PError'); // Redireciona para a tela de erro
    } else {
      // Redireciona para a PHome em caso de sucesso
      router.push('/PHome');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Faça login no portal</Text>
      <TextInput
        style={styles.input}
        placeholder="Phone Number, Username or Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
      {loading ? (
        <ActivityIndicator size="large" color="#3b5998" />
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity onPress={() => router.push('/EsqueciASenha')}>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/PRegistro')}>
        <Text style={styles.signupText}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>

      {/* Botões fixos */}
      <View style={styles.fixedButtons}>
        <TouchableOpacity onPress={() => router.push('/')} style={styles.fixedButton}>
          <Text style={styles.fixedButtonText}>PInicial</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/PHome')} style={styles.fixedButton}>
          <Text style={styles.fixedButtonText}>Home</Text>
        </TouchableOpacity>
      </View>
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
    marginBottom: 40,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#3b5998',
    padding: 15,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  forgotPassword: {
    textAlign: 'center',
    color: '#3b5998',
    marginBottom: 15,
  },
  signupText: {
    textAlign: 'center',
    color: '#3b5998',
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 15,
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

export default PLogin;
