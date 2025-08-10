import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import IconSplashscreen from '../../assets/icon/icon_splashscreen.svg';

export default function SplashScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Menggunakan komponen SVG yang sudah diimpor */}
        <IconSplashscreen width={120} height={120} />
        <Text style={styles.appName}>Jobspot</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // Warna latar belakang biru tua yang sesuai dengan gambar
    backgroundColor: '#2A2A5E',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20, // Jarak antara ikon dan teks
  },
  appName: {
    color: '#FFFFFF',
    fontSize: 36,
    fontWeight: 'bold',
  },
});