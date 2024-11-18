import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { supabase } from '@/supabase/supabase';
import { useRouter } from 'expo-router';

const PRegistro: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async () => {
    setErrorMessage('');
    setLoading(true);

    // Registra o usuário no Supabase
    const { error } = await supabase.auth.signUp({ email, password });
    setLoading(false);

    if (error) {
      setErrorMessage('Erro ao registrar. Tente novamente.');
      Alert.alert('Erro', 'Erro ao registrar. Tente novamente.');
    } else {
      Alert.alert('Sucesso', 'Verifique seu e-mail para confirmar a conta');
      router.push('/PLogin');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Criar Conta</Text>
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
      {loading ? (
        <ActivityIndicator size="large" color="#3b5998" />
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Registrar</Text>
        </TouchableOpacity>
      )}
      
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

export default PRegistro;
