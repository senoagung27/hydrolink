import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Checkbox } from '../../src/components/Checkbox';
import { FormInput } from '../../src/components/FormInput';
import { Header } from '../../src/components/Header';
import { PasswordInput } from '../../src/components/PasswordInput';
import { SocialAuthButton } from '../../src/components/SocialAuthButton';
import { ThemedButton } from '../../src/components/ThemedButton';
import { useAuth } from '../context/AuthContext'; // <-- Ganti path ke context yang benar

export default function LoginScreen() {
    // Gunakan email yang valid dari reqres.in untuk testing
    const [email, setEmail] = useState('seno@agung.com'); 
    const [password, setPassword] = useState('12345678'); // Password yang valid
    const [rememberMe, setRememberMe] = useState(false);
    const { login } = useAuth(); // <-- Gunakan fungsi login dari context

    const handleLogin = async () => {
        try {
            await login(email, password);
            // Navigasi tidak diperlukan di sini, akan ditangani oleh RootLayout
        } catch (error) {
            Alert.alert("Login Failed", (error as Error).message);
        }
    };

    const handleGoogleSignIn = () => {
        console.log('Signing in with Google');
    };

    const handleSignUp = () => {
        console.log('Navigating to Sign Up');
    };

    const handleForgotPassword = () => {
        console.log('Navigating to Forgot Password');
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
            icon={require("../../src/assets/images/favicon.png")} 
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