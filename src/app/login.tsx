import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ThemedText } from '../../src/components/ThemedText';
import { ThemedButton } from '../../src/components/ThemedButton';
import { Colors } from '../../src/constants/Colors';
import { useAuth } from '../app/_layout'; // Import useAuth from _layout.tsx

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { signIn } = useAuth(); // Use the signIn function from useAuth

  const handleLogin = () => {
    // Implement your login logic here.
    // For now, let's just simulate a successful login and navigate.
    console.log('Login attempt with:', { email, password });
    // Simulate successful login
    signIn(); // Call signIn to update authentication status
    router.replace('/(tabs)/saved-jobs'); // Navigate to saved-jobs tab
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <ThemedText type="title" style={styles.welcomeText}>Welcome Back</ThemedText>
        <Text style={styles.subtitle}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
        </Text>
      </View>

      <View style={styles.form}>
        <ThemedText style={styles.label}>Email</ThemedText>
        <TextInput
          style={styles.input}
          placeholder="BrandoneLouis@gmail.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <ThemedText style={styles.label}>Password</ThemedText>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="********"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
            <Image
              source={require('../../src/assets/images/adaptive-icon.png')} // Replace with an actual eye icon
              style={{ width: 24, height: 24, tintColor: Colors.light.icon }}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.optionsContainer}>
          <View style={styles.checkboxContainer}>
            {/* You can add a custom checkbox component here */}
            <TouchableOpacity style={styles.checkbox} />
            <Text>Remember me</Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.forgotPassword}>Forgot Password ?</Text>
          </TouchableOpacity>
        </View>

        <ThemedButton title="LOGIN" onPress={handleLogin} />

        <TouchableOpacity style={styles.googleButton}>
          <Image
            source={require('../../src/assets/images/favicon.png')} // Replace with Google icon
            style={styles.googleIcon}
          />
          <Text style={styles.googleButtonText}>SIGN IN WITH GOOGLE</Text>
        </TouchableOpacity>

        <View style={styles.signUpContainer}>
          <Text>You dont have an account yet? </Text>
          <TouchableOpacity>
            <Text style={styles.signUpText}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1E1E2D',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.light.icon,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  form: {
    width: '100%',
  },
  label: {
    fontSize: 16,
    color: Colors.light.text,
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 20,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
  },
  eyeIcon: {
    padding: 10,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.light.icon,
    marginRight: 8,
  },
  forgotPassword: {
    color: '#1DA1F2',
    fontWeight: 'bold',
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E6EBF5',
    borderRadius: 12,
    paddingVertical: 15,
    marginTop: 15,
  },
  googleIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  googleButtonText: {
    color: '#1E1E2D',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  signUpText: {
    color: '#1DA1F2',
    fontWeight: 'bold',
  },
});