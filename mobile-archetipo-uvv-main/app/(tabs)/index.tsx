import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

const PInicial: React.FC = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo ao Portal!</Text>
      <TouchableOpacity onPress={() => router.push('/PLogin')} style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/PRegistro')} style={styles.button}>
        <Text style={styles.buttonText}>Sign Up</Text>
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

export default PInicial;
