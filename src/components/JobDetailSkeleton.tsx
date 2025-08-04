// src/components/JobDetailSkeleton.tsx
import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const SkeletonPiece = ({ style }: { style: any }) => {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [opacity]);

  return <Animated.View style={[styles.skeleton, { opacity }, style]} />;
};

export const JobDetailSkeleton = () => {
    const insets = useSafeAreaInsets();

    return (
        <View style={[styles.safeArea, { paddingTop: insets.top }]}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <SkeletonPiece style={styles.logo} />
                    <SkeletonPiece style={{ width: '60%', height: 28, borderRadius: 8, marginBottom: 8 }} />
                    <SkeletonPiece style={{ width: '80%', height: 20, borderRadius: 8 }} />
                </View>

                <View style={styles.infoCardsContainer}>
                    <SkeletonPiece style={styles.infoCard} />
                    <SkeletonPiece style={styles.infoCard} />
                    <SkeletonPiece style={styles.infoCard} />
                </View>

                <View style={styles.section}>
                    <SkeletonPiece style={{ width: '40%', height: 24, borderRadius: 8, marginBottom: 16 }} />
                    <SkeletonPiece style={{ width: '100%', height: 16, borderRadius: 8, marginBottom: 8 }} />
                    <SkeletonPiece style={{ width: '100%', height: 16, borderRadius: 8, marginBottom: 8 }} />
                    <SkeletonPiece style={{ width: '70%', height: 16, borderRadius: 8 }} />
                </View>

                <View style={styles.section}>
                    <SkeletonPiece style={{ width: '40%', height: 24, borderRadius: 8, marginBottom: 16 }} />
                    <SkeletonPiece style={{ width: '100%', height: 16, borderRadius: 8, marginBottom: 8 }} />
                    <SkeletonPiece style={{ width: '100%', height: 16, borderRadius: 8, marginBottom: 8 }} />
                </View>
                 <View style={styles.section}>
                    <SkeletonPiece style={{ width: '40%', height: 24, borderRadius: 8, marginBottom: 16 }} />
                    <SkeletonPiece style={{ width: '100%', height: 150, borderRadius: 8, marginBottom: 8 }} />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#F8F9FA' },
    container: { flex: 1, paddingHorizontal: 20 },
    header: { alignItems: 'center', paddingVertical: 20, marginBottom: 20 },
    logo: { width: 80, height: 80, borderRadius: 16, marginBottom: 16 },
    infoCardsContainer: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 24, gap: 10 },
    infoCard: { flex: 1, height: 60, borderRadius: 12 },
    section: { marginBottom: 24 },
    skeleton: {
        backgroundColor: '#E0E0E0',
    },
});