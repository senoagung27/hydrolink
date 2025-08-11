// src/app/select-job-position.tsx

import { useRouter, useLocalSearchParams } from 'expo-router';
import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';
import { useAddJob } from '../context/AddJobContext'; 

const JOB_POSITIONS = [
  'Assistant', 'Associate', 'Administrative Assistant', 'Account Manager', 
  'Assistant Manager', 'Commission Sales Associate', 'Sales Attendant', 
  'Accountant', 'Sales Advocate', 'Analyst', 'UI/UX Designer', 
  'Software Engineer', 'Product Manager',
];

export default function SelectJobPositionScreen() {
  const router = useRouter();
  const { source, id } = useLocalSearchParams<{ source?: string, id?: string }>();
  const { setJobDetail } = useAddJob();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSelect = (position: string) => {
    // If coming from the edit screen, replace the screen with updated params
    if (source === 'edit-job' && id) {
      router.replace(`/edit-job?id=${id}&selectedPosition=${position}`);
    } else {
      // Original behavior for the "add job" flow
      setJobDetail('job_position', position);
      router.back();
    }
  };

  const filteredPositions = useMemo(() =>
    JOB_POSITIONS.filter((item) =>
      item.toLowerCase().includes(searchQuery.toLowerCase())
    ), [searchQuery]);

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
        <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                 <FontAwesome name="arrow-left" size={20} color="#1E1E2D" />
            </TouchableOpacity>
            <Text style={styles.title}>Job Position</Text>
        </View>

        <View style={styles.searchContainer}>
            <FontAwesome name="search" size={18} color="#999" style={styles.searchIcon} />
            <TextInput
                placeholder="Search"
                style={styles.searchInput}
                value={searchQuery}
                onChangeText={setSearchQuery}
                autoFocus
            />
            {searchQuery.length > 0 && (
                <TouchableOpacity onPress={() => setSearchQuery('')}>
                    <FontAwesome name="times-circle" size={18} color="#999" />
                </TouchableOpacity>
            )}
        </View>

        <FlatList
            data={filteredPositions}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
            <TouchableOpacity style={styles.item} onPress={() => handleSelect(item)}>
                <Text style={styles.itemText}>{item}</Text>
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
    searchInput: {
        flex: 1,
        height: 50,
        fontSize: 16,
    },
    item: { 
        paddingVertical: 18,
        paddingHorizontal: 20,
        borderBottomWidth: 1, 
        borderBottomColor: '#F0F0F0' 
    },
    itemText: {
        fontSize: 16,
        color: '#333',
    }
});