import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COMPANIES } from '../../constants/companies';

export default function ConnectionsScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Text style={styles.title}>My Connection</Text>
      <FlatList
        data={COMPANIES}
        numColumns={2}
        keyExtractor={(item) => item.name}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <FontAwesome name={item.logo as any} size={36} color={item.color} />
            <Text style={styles.companyName}>{item.name}</Text>
            <Text style={styles.followers}>1M Followers</Text>
            <TouchableOpacity style={styles.followButton}>
              <Text style={styles.followButtonText}>Follow</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 20,
    marginLeft: 25,
  },
  // Tab styles
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#E8EAF6',
    borderRadius: 25,
    marginHorizontal: 20,
    marginVertical: 15,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 21,
  },
  activeTab: {
    backgroundColor: '#3D3D71',
  },
  tabText: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#687076',
  },
  activeTabText: {
    color: 'white',
  },
  // List and Card styles
  listContainer: {
    paddingHorizontal: 15,
    paddingBottom: 80, // <-- Padding bawah untuk memberi ruang dari tab bar
  },
  card: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingVertical: 20, // Penyesuaian padding
    paddingHorizontal: 10, // Penyesuaian padding
    alignItems: 'center',
    margin: 8,
    shadowColor: '#171717',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    minHeight: 180, // Menetapkan tinggi minimum agar kartu seragam
    justifyContent: 'space-between' // Menyebar konten secara vertikal
  },
  companyName: {
    fontSize: 15, // Sedikit diperkecil untuk nama yang panjang
    fontWeight: 'bold',
    marginTop: 12,
    textAlign: 'center',
    flexShrink: 1, // Memastikan teks bisa menyusut jika perlu
  },
  followers: {
    fontSize: 13,
    color: '#687076',
    marginTop: 4, // Penyesuaian margin
    marginBottom: 16,
  },
  followButton: {
    borderColor: '#E0E0E0',
    borderWidth: 1.5,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 25,
  },
  followButtonText: {
    fontWeight: 'bold',
    color: '#3D3D71',
  },
});