// src/components/ListHeader.tsx
import { FontAwesome } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { ThemedText } from './ThemedText';
import { useAuth } from '../context/AuthContext'; 
import { User } from '../types/user'; 

export const ListHeader = () => {
    const { token } = useAuth(); 
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            if (!token) return;
            try {
                const response = await fetch('https://dummyjson.com/auth/me', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = await response.json();
                if (response.ok) {
                    setUser(data);
                }
            } catch (error) {
                console.error("Failed to fetch user:", error);
            }
        };
        fetchUser();
    }, [token]);

    const getGreeting = () => {
        const currentHour = new Date().getHours();
        if (currentHour >= 3 && currentHour < 11) {
            return 'Selamat Pagi';
        } else if (currentHour >= 11 && currentHour < 15) {
            return 'Selamat Siang';
        } else if (currentHour >= 15 && currentHour < 19) {
            return 'Selamat Sore';
        } else {
            return 'Selamat Malam';
        }
    };

    const greeting = getGreeting();
    const userName = user ? `${user.firstName} ${user.lastName}` : 'Guest';

    return (
        <View>
            <View style={styles.header}>
                <View>
                    <ThemedText style={styles.greetingText}>{greeting}</ThemedText>
                    {/* Nama pengguna sekarang dinamis */}
                    <ThemedText style={styles.userNameText}>{userName}</ThemedText>
                </View>
            </View>
            <View style={styles.promoCard}>
                <View>
                    <Text style={styles.promoTextLarge}>50% off</Text>
                    <Text style={styles.promoTextSmall}>take any courses</Text>
                    <TouchableOpacity style={styles.joinButton}>
                        <Text style={styles.joinButtonText}>Join Now</Text>
                    </TouchableOpacity>
                </View>
                <Image
                    source={require('../assets/images/card_home.png')}
                    style={styles.promoImage}
                />
            </View>
            <ThemedText style={styles.sectionTitle}>Find Your Job</ThemedText>
            <View style={styles.findJobContainer}>
                <TouchableOpacity style={[styles.findJobCard, styles.remoteJobCard]}>
                    <FontAwesome name="file-text-o" size={24} color="#25A3A3" />
                    <Text style={styles.findJobCardNumber}>44.5k</Text>
                    <Text style={styles.findJobCardLabel}>Remote Job</Text>
                </TouchableOpacity>
                <View style={styles.sideJobCards}>
                    <TouchableOpacity style={[styles.findJobCard, styles.fullTimeCard]}>
                        <Text style={styles.findJobCardNumber}>66.8k</Text>
                        <Text style={styles.findJobCardLabel}>Full Time</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.findJobCard, styles.partTimeCard]}>
                        <Text style={styles.findJobCardNumber}>38.9k</Text>
                        <Text style={styles.findJobCardLabel}>Part Time</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.recentJobsHeader}>
                <ThemedText style={styles.sectionTitle}>Recent Job List</ThemedText>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
    },
    greetingText: {
        fontSize: 25,
        fontWeight: 'bold',
    },
    userNameText: {
        fontSize: 18,
        color: '#687076',
    },
    promoCard: {
        backgroundColor: '#3D3D71',
        borderRadius: 20,
        paddingVertical: 20,
        paddingLeft: 20,
        marginVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 140,
    },
    promoTextLarge: {
        color: 'white',
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    promoTextSmall: {
        color: 'white',
        fontSize: 16,
        marginBottom: 15,
    },
    joinButton: {
        backgroundColor: '#F9A826',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 10,
        alignSelf: 'flex-start',
    },
    joinButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    promoImage: {
        width: 150,
        height: 160,
        resizeMode: 'contain',
        position: 'absolute',
        right: 0,
        bottom: 0,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    findJobContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10,
        gap: 15,
    },
    remoteJobCard: {
        flex: 1,
        backgroundColor: '#AFE1E1',
        paddingVertical: 20,
        alignItems: 'center',
        justifyContent: 'center',
        height: 160,
    },
    sideJobCards: {
        flex: 1,
        gap: 15,
    },
    findJobCard: {
        borderRadius: 20,
        padding: 15,
    },
    fullTimeCard: {
        backgroundColor: '#D0C0FF',
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
    },
    partTimeCard: {
        backgroundColor: '#FADCB3',
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
    },
    findJobCardNumber: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1E1E2D',
        marginTop: 8,
    },
    findJobCardLabel: {
        fontSize: 16,
        color: '#333',
        marginTop: 4,
    },
    recentJobsHeader: {
        marginTop: 20,
        marginBottom: 10,
    },
});