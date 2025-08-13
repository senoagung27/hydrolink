// src/app/(tabs)/profile.tsx
import { FontAwesome } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../context/AuthContext';
import { User } from '../../types/user';
import { ProfileSkeleton } from '../../components/ProfileSkeleton'; // Import the skeleton component

export default function ProfileScreen() {
  const { token, logout } = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      if (!token) {
        setLoading(false);
        return;
      }
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
        } else {
          if (response.status === 401 || data.message.includes("Invalid token")) {
            Alert.alert("Session Expired", "Your session has expired. Please log in again.");
            logout(); // Panggil fungsi logout jika token tidak valid
          } else {
            throw new Error(data.message || 'Failed to fetch user data');
          }
        }
      } catch (error) {
        console.error(error);
        // Tampilkan pesan jika gagal selain karena token expired
        if (token) { // Hanya tampilkan error jika logout belum dipicu
            Alert.alert("Error", "Could not fetch profile data.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [token, logout]);
  
  const handleLogout = () => {
      Alert.alert(
        "Logout",
        "Are you sure you want to logout?",
        [
          { text: "Cancel", style: "cancel" },
          { text: "OK", onPress: () => logout() }
        ]
      );
  };


  if (loading) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <ProfileSkeleton />
      </SafeAreaView>
    );
  }

  if (!user) {
    return (
      <View style={styles.centered}>
        <Text>Could not load profile. Please login again.</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 30 }}>
        {/* -- PROFILE HEADER CARD -- */}
        <View style={styles.profileHeader}>
            <View style={styles.headerIcons}>
              <TouchableOpacity>
                <FontAwesome name="share" size={22} color="white" />
              </TouchableOpacity>
              <TouchableOpacity>
                <FontAwesome name="cog" size={24} color="white" />
              </TouchableOpacity>
            </View>

            <View style={styles.userInfo}>
              <Image source={{ uri: user.image }} style={styles.profileImage} />
              <Text style={styles.userName}>{`${user.firstName} ${user.lastName}`}</Text>
              <Text style={styles.userLocation}>{`${user.address.city}, ${user.address.country}`}</Text>
            </View>
            
            {/* -- REVISED STATS CONTAINER -- */}
            <View style={styles.statsContainer}>
              <View style={styles.statsGroup}>
                <View style={styles.stat}>
                  <Text style={styles.statNumber}>120k</Text>
                  <Text style={styles.statLabel}>Follower</Text>
                </View>
                <View style={styles.stat}>
                  <Text style={styles.statNumber}>23k</Text>
                  <Text style={styles.statLabel}>Following</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.editProfileButton}>
                <Text style={styles.editProfileText}>Edit profile</Text>
                <FontAwesome name="pencil" size={14} color="#4A437E" />
              </TouchableOpacity>
            </View>
        </View>

        {/* -- ABOUT ME CARD -- */}
        <View style={styles.aboutCard}>
          <View style={styles.cardHeaderRow}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <FontAwesome name="user-o" size={20} color="#F9AD5D" style={{ marginRight: 12 }} />
              <Text style={styles.cardTitle}>About me</Text>
            </View>
            <TouchableOpacity>
              <FontAwesome name="pencil" size={20} color="#F9AD5D" />
            </TouchableOpacity>
          </View>
          <Text style={styles.aboutText}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lectus id commodo egestas metus interdum dolor.
          </Text>
        </View>

        {/* -- NEW LOGOUT CARD -- */}
        <TouchableOpacity style={styles.logoutCard} onPress={handleLogout}>
            <FontAwesome name="sign-out" size={22} color="#FF6347" />
            <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    // --- Header Card Styles ---
    profileHeader: {
        backgroundColor: '#4A437E',
        borderRadius: 24,
        marginHorizontal: 20,
        marginTop: 20,
        padding: 20,
        shadowColor: '#4A437E',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        elevation: 10,
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
        borderWidth: 3,
        borderColor: 'white',
        marginBottom: 12,
    },
    userName: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'white',
    },
    userLocation: {
        fontSize: 14,
        color: '#D0D0D0',
        marginTop: 4,
    },
    // --- Stats & Edit Button Styles ---
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
    statNumber: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
    },
    statLabel: {
        fontSize: 13,
        color: '#D0D0D0',
        marginTop: 2,
    },
    editProfileButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 16,
        gap: 8,
    },
    editProfileText: {
        color: '#4A437E',
        fontWeight: 'bold',
        fontSize: 14,
    },
    // --- General Card Styles ---
    aboutCard: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        marginHorizontal: 20,
        marginTop: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 3,
    },
    cardHeaderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1E1E2D',
    },
    aboutText: {
        fontSize: 15,
        lineHeight: 22,
        color: '#687076',
    },
    // --- Logout Card Styles ---
    logoutCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        marginHorizontal: 20,
        marginTop: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 3,
        gap: 15,
    },
    logoutText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FF6347',
    },
});