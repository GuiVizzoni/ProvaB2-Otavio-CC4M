import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { supabase } from '@/supabase/supabase';
import { useRouter } from 'expo-router';

const EsqueciASenha: React.FC = () => {
  const [email, setEmail] = useState('');
  const router = useRouter();

  const handleResetPassword = async () => {
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) {
      alert(error.message);
    } else {
      alert('Verifique seu e-mail para redefinir sua senha');
      router.push('/PLogin');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Esqueci a Senha</Text>
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
        <Text style={styles.buttonText}>Enviar</Text>
      </TouchableOpacity>

      {/* Fixos */}
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
    backgroundColor: 'linear-gradient(180deg, rgba(255, 255, 255, 0.6) 0%, rgba(0, 0, 255, 0.1) 100%)',
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

export default EsqueciASenha;
