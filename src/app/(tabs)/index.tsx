// src/app/(tabs)/index.tsx
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { JobCard } from '../../components/JobCard';
import { ListHeader } from '../../components/ListHeader'; // Import ListHeader
import SkeletonCard from '../../components/SkeletonCard';
import { ThemedView } from '../../components/ThemedView';
import { useJob } from '../../context/JobContext';
import { Job } from '../../types/job';
import { useSavedJobs } from '../../hooks/useSavedJobs'; // NEW: Import the custom hook

const JOBS_PER_PAGE = 3;

export default function HomeScreen() {
  const { jobs, loading: initialLoading } = useJob();
  const router = useRouter();

  const [displayedJobs, setDisplayedJobs] = useState<Job[]>([]);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [allJobsLoaded, setAllJobsLoaded] = useState(false);

  useEffect(() => {
    if (jobs.length > 0) {
      setDisplayedJobs(jobs.slice(0, JOBS_PER_PAGE));
      setAllJobsLoaded(jobs.length <= JOBS_PER_PAGE);
    }
  }, [jobs]);
   const {
      handleNavigateToDetail,
      handleDeleteJob,
      handleUpdateJob,
    } = useSavedJobs();

  const handleLoadMore = useCallback(() => {
    if (loadingMore || allJobsLoaded) return;

    setLoadingMore(true);
    setTimeout(() => {
      const nextPage = page + 1;
      const newJobs = jobs.slice(0, nextPage * JOBS_PER_PAGE);
      setDisplayedJobs(newJobs);
      setPage(nextPage);
      setAllJobsLoaded(newJobs.length >= jobs.length);
      setLoadingMore(false);
    }, 1000);
  }, [page, loadingMore, allJobsLoaded, jobs]);

  if (initialLoading) {
    return (
      <ThemedView style={styles.container}>
        <ListHeader />
        <FlatList
          data={[1, 2, 3]}
          renderItem={() => <SkeletonCard />}
          keyExtractor={(item) => item.toString()}
          scrollEnabled={false}
        />
      </ThemedView>
    );
  }

  const ListFooter = () => {
    if (loadingMore) {
      return <ActivityIndicator size="large" style={{ marginVertical: 20 }} />;
    }

    if (allJobsLoaded) {
      return null;
    }

    return (
      <TouchableOpacity style={styles.seeAllButton} onPress={handleLoadMore}>
        <Text style={styles.seeAllButtonText}>Lihat Lebih Banyak</Text>
        <FontAwesome name="arrow-down" size={16} color="#0a7ea4" />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ListHeaderComponent={ListHeader}
        data={displayedJobs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleNavigateToDetail(item.id)}>
            <JobCard job={item} onDelete={handleDeleteJob} onUpdate={handleUpdateJob} />
          </TouchableOpacity>
        )}
        ListFooterComponent={ListFooter}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    paddingHorizontal: 20,
  },
  listContent: {
    paddingBottom: 20,
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    marginTop: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#0a7ea4',
  },
  seeAllButtonText: {
    color: '#0a7ea4',
    fontWeight: 'bold',
    marginRight: 8,
  },
});