// src/components/ListHeader.tsx
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useMemo } from 'react';
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
import { useJob } from '../context/JobContext';

export const ListHeader = () => {
    const { token } = useAuth();
    const [user, setUser] = React.useState<User | null>(null);
    const { jobs } = useJob();
    const router = useRouter();

    const handleFilterPress = (filter: string) => {
        // This function navigates to the saved jobs tab and passes the filter
        // as a URL query parameter. This is a reliable way to pass data between screens.
        router.push(`/saved-jobs?filter=${filter}`);
    };

    // Logic to count jobs by workplace_type
    const jobCounts = useMemo(() => {
        const counts = {
            'On-site': 0,
            Remote: 0,
            Hybrid: 0,
        };

        const filteredJobs = jobs.filter(job => job.job_type !== 'Part time');

        filteredJobs.forEach(job => {
            if (job.workplace_type === 'Remote') {
                counts.Remote++;
            } else if (job.workplace_type === 'Hybrid') {
                counts.Hybrid++;
            } else if (job.workplace_type === 'On-site' || job.job_type === 'Full time') {
                counts['On-site']++;
            }
        });
        return counts;
    }, [jobs]);

    React.useEffect(() => {
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
            
            {/* --- THIS IS THE CLICKABLE SECTION --- */}
            <View style={styles.findJobContainer}>
                {/* Remote Job Card */}
                <TouchableOpacity style={[styles.findJobCard, styles.remoteJobCard]} onPress={() => handleFilterPress('Remote')}>
                    <FontAwesome name="file-text-o" size={24} color="#25A3A3" />
                    <Text style={styles.findJobCardNumber}>{jobCounts.Remote}</Text>
                    <Text style={styles.findJobCardLabel}>Remote Job</Text>
                </TouchableOpacity>
                {/* On-site & Hybrid Cards */}
                <View style={styles.sideJobCards}>
                    <TouchableOpacity style={[styles.findJobCard, styles.fullTimeCard]} onPress={() => handleFilterPress('On-site')}>
                        <Text style={styles.findJobCardNumber}>{jobCounts['On-site']}</Text>
                        <Text style={styles.findJobCardLabel}>On-site</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.findJobCard, styles.hybridJobCard]} onPress={() => handleFilterPress('Hybrid')}>
                        <Text style={styles.findJobCardNumber}>{jobCounts.Hybrid}</Text>
                        <Text style={styles.findJobCardLabel}>Hybrid</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.recentJobsHeader}>
                <ThemedText style={styles.sectionTitle}>Recent Job List</ThemedText>
            </View>
        </View>
    );
};

// Styles remain the same
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
        overflow: 'hidden',
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
        bottom: -20,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    findJobContainer: {
        flexDirection: 'row',
        marginVertical: 10,
        gap: 15,
        height: 170,
    },
    remoteJobCard: {
        flex: 1,
        backgroundColor: '#AFE1E1',
        height: '100%',
    },
    sideJobCards: {
        flex: 1,
        flexDirection: 'column',
        gap: 15,
        height: '100%',
    },
    findJobCard: {
        borderRadius: 20,
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    fullTimeCard: {
        backgroundColor: '#D0C0FF',
        flex: 1,
    },
    hybridJobCard: {
        backgroundColor: '#FADCB3',
        flex: 1,
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