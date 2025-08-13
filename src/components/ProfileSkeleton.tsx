import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

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

export const ProfileSkeleton = () => {
    return (
        <View style={styles.container}>
            <View style={styles.profileHeader}>
                <View style={styles.headerIcons}>
                    <SkeletonPiece style={{ width: 22, height: 22, borderRadius: 11 }} />
                    <SkeletonPiece style={{ width: 24, height: 24, borderRadius: 12 }} />
                </View>

                <View style={styles.userInfo}>
                    <SkeletonPiece style={styles.profileImage} />
                    <SkeletonPiece style={{ width: '60%', height: 22, borderRadius: 8, marginBottom: 8 }} />
                    <SkeletonPiece style={{ width: '40%', height: 14, borderRadius: 8 }} />
                </View>

                <View style={styles.statsContainer}>
                    <View style={styles.statsGroup}>
                        <View style={styles.stat}>
                            <SkeletonPiece style={{ width: 40, height: 16, borderRadius: 8 }} />
                            <SkeletonPiece style={{ width: 50, height: 13, borderRadius: 8, marginTop: 4 }} />
                        </View>
                        <View style={styles.stat}>
                            <SkeletonPiece style={{ width: 30, height: 16, borderRadius: 8 }} />
                            <SkeletonPiece style={{ width: 60, height: 13, borderRadius: 8, marginTop: 4 }} />
                        </View>
                    </View>
                    <SkeletonPiece style={styles.editProfileButton} />
                </View>
            </View>

            <View style={styles.aboutCard}>
                <View style={styles.cardHeaderRow}>
                    <SkeletonPiece style={{ width: '30%', height: 20, borderRadius: 8 }}/>
                    <SkeletonPiece style={{ width: 20, height: 20, borderRadius: 10 }}/>
                </View>
                <SkeletonPiece style={{ width: '100%', height: 15, borderRadius: 8, marginBottom: 8 }}/>
                <SkeletonPiece style={{ width: '80%', height: 15, borderRadius: 8 }}/>
            </View>

            <View style={styles.logoutCard}>
                <SkeletonPiece style={{ width: '40%', height: 22, borderRadius: 8 }}/>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 30,
    },
    profileHeader: {
        backgroundColor: '#E0E0E0',
        borderRadius: 24,
        padding: 20,
        marginBottom: 24,
    },
    headerIcons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    userInfo: {
        alignItems: 'center',
    },
    profileImage: {
        width: 90,
        height: 90,
        borderRadius: 45,
        marginBottom: 12,
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 24,
    },
    statsGroup: {
        flexDirection: 'row',
        gap: 24,
    },
    stat: {
        alignItems: 'center',
    },
    editProfileButton: {
        width: 110,
        height: 40,
        borderRadius: 20,
    },
    aboutCard: {
        backgroundColor: '#E0E0E0',
        borderRadius: 20,
        padding: 20,
        marginBottom: 16,
    },
    cardHeaderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    logoutCard: {
        backgroundColor: '#E0E0E0',
        borderRadius: 20,
        padding: 20,
        height: 65,
    },
    skeleton: {
        backgroundColor: '#C0C0C0',
    },
});