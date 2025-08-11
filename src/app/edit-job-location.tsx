// src/app/edit-job-location.tsx
import { FontAwesome } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
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
import { LOCATIONS } from '../constants/locations';

export default function EditJobLocationScreen() {
    const router = useRouter();
    const { id } = useLocalSearchParams<{ id: string }>();
    const [searchQuery, setSearchQuery] = useState('');

    const handleSelect = (location: string) => {
        if (id) {
            router.replace(`/edit-job?id=${id}&selectedLocation=${location}`);
        } else {
            router.back();
        }
    };

    const filteredLocations = useMemo(
        () =>
            LOCATIONS.filter((item) =>
                item.toLowerCase().includes(searchQuery.toLowerCase())
            ),
        [searchQuery]
    );

    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <FontAwesome name="arrow-left" size={20} color="#1E1E2D" />
                </TouchableOpacity>
                <Text style={styles.title}>Edit Location</Text>
            </View>

            <View style={styles.searchContainer}>
                <FontAwesome
                    name="search"
                    size={18}
                    color="#999"
                    style={styles.searchIcon}
                />
                <TextInput
                    placeholder="Search for a location"
                    style={styles.searchInput}
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    autoFocus={true}
                />
                {searchQuery.length > 0 && (
                    <TouchableOpacity onPress={() => setSearchQuery('')}>
                        <FontAwesome name="times-circle" size={18} color="#999" />
                    </TouchableOpacity>
                )}
            </View>

            <FlatList
                data={filteredLocations}
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
        paddingHorizontal: 25,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    itemText: {
        fontSize: 16,
        color: '#333',
    },
});