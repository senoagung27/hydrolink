import React from 'react';
import { FlatList, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { ThemedText } from '../../components/ThemedText';
import { ThemedView } from '../../components/ThemedView';
import { JobCard } from '../../components/JobCard';
import { jobs } from '../../constants/mockJobs'; // Impor data pekerjaan

export default function SavedJobsScreen() {
  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <ThemedText type="title">Save Job</ThemedText>
        <TouchableOpacity>
          <Text style={styles.deleteAllText}>Delete all</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={jobs}
        renderItem={({ item }) => <JobCard job={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  deleteAllText: {
    color: '#FF6347',
    fontSize: 16,
  },
  list: {
    paddingBottom: 20,
  },
});