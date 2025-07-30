// src/components/SkeletonCard.tsx
import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

const SkeletonCard = () => {
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

  return (
    <View style={styles.card}>
      <Animated.View style={[styles.skeleton, { opacity }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#E0E0E0',
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    height: 150,
  },
  skeleton: {
    flex: 1,
    backgroundColor: '#C0C0C0',
    borderRadius: 10,
  },
});

export default SkeletonCard;