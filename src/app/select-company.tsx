import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAddJob } from '../context/AddJobContext';
import { COMPANIES } from '../constants/companies';

export default function SelectCompanyScreen() {
  const router = useRouter();
  const { setJobDetail } = useAddJob();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSelect = (companyName: string) => {
    setJobDetail('company', companyName);
    router.back();
  };

  const filteredCompanies = useMemo(
    () =>
      COMPANIES.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [searchQuery]
  );

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <FontAwesome name="arrow-left" size={20} color="#1E1E2D" />
        </TouchableOpacity>
        <Text style={styles.title}>Company</Text>
      </View>

      <View style={styles.searchContainer}>
        <FontAwesome
          name="search"
          size={18}
          color="#999"
          style={styles.searchIcon}
        />
        <TextInput
          placeholder="Search for a company"
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={setSearchQuery}
          autoFocus={true}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <FontAwesome name="times" size={20} color="#999" />
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        data={filteredCompanies}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.item} onPress={() => handleSelect(item.name)}>
            <FontAwesome
              name={item.logo as any}
              size={24}
              color={item.color}
              style={styles.logoIcon}
            />
            <View style={styles.companyContainer}>
                <Text style={styles.companyName}>{item.name}</Text>
                <Text style={styles.companyCategory}>{`${item.type} · ${item.category}`}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FDFDFD' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 10,
    paddingBottom: 20,
  },
  backButton: {
    padding: 5,
    marginRight: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E1E2D',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginHorizontal: 20,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    marginBottom: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  logoIcon: {
    marginRight: 15,
    width: 24, // Menjamin lebar ikon konsisten
    textAlign: 'center',
  },
  searchInput: {
    flex: 1,
    height: 50,
    fontSize: 16,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  companyContainer: {
    flexDirection: 'column',
  },
  companyName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1E1E2D',
  },
  companyCategory: {
      fontSize: 14,
      color: '#687076',
      marginTop: 2,
  }
});