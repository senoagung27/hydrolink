import React from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { JobCard } from '../../components/JobCard';
import { ThemedText } from '../../components/ThemedText';
import { useJob } from '../../context/JobContext';
import { useSavedJobs } from '../../hooks/useSavedJobs';

export default function SavedJobsScreen() {
  const { loading } = useJob();
  const {
    savedJobs,
    isRefreshing,
    handleRefresh,
    handleNavigateToDetail,
    handleDeleteJob,
    handleUpdateJob,
    deleteAllJobs,
  } = useSavedJobs();

  if (loading && !isRefreshing) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

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
      <FlatList
        data={savedJobs}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleNavigateToDetail(item.id)}>
            <JobCard job={item} onDelete={() => handleDeleteJob(item.id)} onUpdate={handleUpdateJob} />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        onRefresh={handleRefresh}
        refreshing={isRefreshing}
      />
    </SafeAreaView>
  );
}

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
    marginBottom: 20,
    paddingTop: 20, // Add padding top to the header itself
  },
  deleteAllText: {
    color: '#FF6347',
    fontSize: 16,
  },
  list: {
    paddingBottom: 20,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});