// src/app/(tabs)/saved-jobs.tsx
import { FontAwesome } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import React, { useMemo, useState, useEffect } from 'react';
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Illustration from '../../assets/images/Illustrasi.svg';
import { JobCard } from '../../components/JobCard';
import { ThemedButton } from '../../components/ThemedButton';
import { ThemedText } from '../../components/ThemedText';
import { useJob } from '../../context/JobContext';
import { useSavedJobs } from '../../hooks/useSavedJobs';

const FILTER_OPTIONS = ['All Jobs', 'On-site', 'Remote', 'Hybrid'];

export default function SavedJobsScreen() {
  const { loading } = useJob();
  const {
    savedJobs,
    isRefreshing,
    handleRefresh,
    handleNavigateToDetail,
    handleDeleteJob,
    deleteAllJobs,
  } = useSavedJobs();
  const params = useLocalSearchParams<{ filter?: string }>();
  const [activeFilter, setActiveFilter] = useState('All Jobs');
  const [searchQuery, setSearchQuery] = useState('');

  // --- FIX ---
  // This useEffect hook listens for changes to the 'filter' parameter from the URL.
  // If it finds a filter, it updates the activeFilter state.
  useEffect(() => {
    if (params.filter && FILTER_OPTIONS.includes(params.filter)) {
      setActiveFilter(params.filter);
    }
  }, [params.filter]);

  const filteredJobs = useMemo(() => {
    let jobs = savedJobs;

    if (activeFilter !== 'All Jobs') {
      jobs = jobs.filter((job) => job.workplace_type === activeFilter);
    }

    if (searchQuery) {
      jobs = jobs.filter(
        (job) =>
          job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.company.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return jobs;
  }, [savedJobs, activeFilter, searchQuery]);

  if (loading && !isRefreshing) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const EmptyListComponent = () => (
    <View style={styles.emptyContainer}>
      {savedJobs.length === 0 ? (
        <ThemedText style={styles.emptySubtitle}>You have no saved jobs yet.</ThemedText>
      ) : (
        <>
          <Illustration width={200} height={160} />
          <ThemedText type="subtitle" style={styles.emptyTitle}>
            No results found
          </ThemedText>
          <ThemedText style={styles.emptySubtitle}>
            The search could not be found, please check spelling or write another word.
          </ThemedText>
        </>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <ThemedText type="title">Save Job</ThemedText>
        {savedJobs.length > 0 && (
          <TouchableOpacity onPress={deleteAllJobs}>
            <Text style={styles.deleteAllText}>Delete all</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.searchContainer}>
        <FontAwesome name="search" size={18} color="#999" style={styles.searchIcon} />
        <TextInput
          placeholder="Search by job title or company"
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <FontAwesome name="times-circle" size={18} color="#999" />
          </TouchableOpacity>
        )}
      </View>

      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterContainer}>
          {FILTER_OPTIONS.map((option) => (
            <ThemedButton
              key={option}
              title={option}
              isActive={activeFilter === option}
              onPress={() => setActiveFilter(option)}
            />
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={filteredJobs}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleNavigateToDetail(item.id)}>
            <JobCard job={item} onDelete={() => handleDeleteJob(item.id)} />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        onRefresh={handleRefresh}
        refreshing={isRefreshing}
        ListEmptyComponent={EmptyListComponent}
      />
    </SafeAreaView>
  );
}

// Styles remain the same
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingTop: 20,
  },
  deleteAllText: {
    color: '#FF6347',
    fontSize: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
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
  filterContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
    marginBottom: 10,
  },
  list: {
    paddingBottom: 80,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
    paddingHorizontal: 20,
  },
  emptyTitle: {
    marginTop: 24,
    marginBottom: 8,
    color: '#1E1E2D',
  },
  emptySubtitle: {
    textAlign: 'center',
    color: '#687076',
    fontSize: 16,
    lineHeight: 24,
  },
});