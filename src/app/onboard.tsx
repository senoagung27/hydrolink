// src/app/onboard.tsx
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import IconSplashscreen from '../assets/images/onboard.svg'; // <-- Diperbarui

export default function OnboardScreen() {
    const router = useRouter();

    return (
        <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Jobspot</Text>
            </View>
            <View style={styles.content}>
                {/* Menggunakan komponen SVG yang diimpor */}
                <IconSplashscreen width={300} height={300} style={styles.image} />
                <Text style={styles.title}>
                    Find Your <Text style={styles.titleHighlight}>Dream Job</Text> Here!
                </Text>
                <Text style={styles.subtitle}>
                    Explore all the most exciting job roles based on your interest and study major.
                </Text>
            </View>
            <View style={styles.footer}>
                <TouchableOpacity style={styles.button} onPress={() => router.push('/login')}>
                    <Text style={styles.buttonText}>→</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        justifyContent: 'space-between',
    },
    header: {
        alignItems: 'flex-end',
        paddingHorizontal: 30,
        paddingTop: 20,
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    content: {
        alignItems: 'center',
        paddingHorizontal: 40,
    },
    image: {
        marginBottom: 40,
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    titleHighlight: {
        color: '#F9774E',
        textDecorationLine: 'underline',
    },
    subtitle: {
        fontSize: 16,
        textAlign: 'center',
        color: '#687076',
        lineHeight: 24,
    },
    footer: {
        alignItems: 'flex-end',
        paddingHorizontal: 30,
        paddingBottom: 40,
    },
    button: {
        backgroundColor: '#1E1E2D',
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 24,
    },
});