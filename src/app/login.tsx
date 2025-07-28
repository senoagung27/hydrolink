// app/LoginScreen.tsx (or wherever you prefer to keep your screens)
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Colors } from '../../src/constants/Colors';
import { useAuth } from '../app/_layout'; // Adjust path if needed

// Import the new components
import { Header } from '../../src/components/Header';
import { FormInput } from '../../src/components/FormInput';
import { PasswordInput } from '../../src/components/PasswordInput';
import { Checkbox } from '../../src/components/Checkbox';
import { ThemedButton } from '../../src/components/ThemedButton'; // Assuming existing
import { SocialAuthButton } from '../../src/components/SocialAuthButton';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false); // State for remember me
  const router = useRouter();
  const { signIn } = useAuth();

  const handleLogin = () => {
    console.log('Login attempt with:', { email, password, rememberMe });
    signIn();
    router.replace('/(tabs)/saved-jobs');
  };

  const handleGoogleSignIn = () => {
    console.log('Signing in with Google');
    // Implement Google sign-in logic here
  };

  const handleSignUp = () => {
    console.log('Navigating to Sign Up');
    // Navigate to sign up screen
  };

  const handleForgotPassword = () => {
    console.log('Navigating to Forgot Password');
    // Navigate to forgot password screen
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Welcome Back"
        subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
      />

      <View style={styles.form}>
        <FormInput
          label="Email"
          placeholder="BrandoneLouis@gmail.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <PasswordInput
          label="Password"
          value={password}
          onChangeText={setPassword}
        />

        <View style={styles.optionsContainer}>
          <View style={styles.checkboxContainer}>
            <Checkbox
              isChecked={rememberMe}
              onPress={() => setRememberMe(!rememberMe)}
            />
            <Text>Remember me</Text>
          </View>
          <TouchableOpacity onPress={handleForgotPassword}>
            <Text style={styles.forgotPassword}>Forgot Password ?</Text>
          </TouchableOpacity>
        </View>

        <ThemedButton title="LOGIN" onPress={handleLogin} />

        <SocialAuthButton
          title="SIGN IN WITH GOOGLE"
          icon={require('../src/assets/images/favicon.png')} // Use the correct path for Google icon
          onPress={handleGoogleSignIn}
        />

        <View style={styles.signUpContainer}>
          <Text>You dont have an account yet? </Text>
          <TouchableOpacity onPress={handleSignUp}>
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
  form: {
    width: '100%',
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
  forgotPassword: {
    color: '#1DA1F2',
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