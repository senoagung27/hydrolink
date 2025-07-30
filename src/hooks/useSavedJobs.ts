// src/hooks/useSavedJobs.ts
import { useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { Alert } from 'react-native';
import { useJob } from '../context/JobContext';
import { Job } from '../types/job';
import { deleteJobApi, updateJobApi } from '../api/apiJobs'; // Pastikan ini diimpor

export const useSavedJobs = () => {
  const router = useRouter();
  const { jobs, deleteJob, updateJob, refetchJobs } = useJob();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    try {
      if (refetchJobs) {
        await refetchJobs();
      }
    } catch (error) {
      console.error("Failed to refresh jobs:", error);
      Alert.alert("Error", "Gagal memuat ulang data pekerjaan.");
    } finally {
      setIsRefreshing(false);
    }
  }, [refetchJobs]);

  const handleNavigateToDetail = (jobId: string) => {
    router.push(`/job-detail/job-detail?id=${jobId}`);
  };

  const handleDeleteJob = async (jobId: string) => {
    const success = await deleteJobApi(jobId);
    if (success) {
      deleteJob(jobId);
    }
  };

  const handleUpdateJob = async (job: Job) => {
    const success = await updateJobApi(job);
    if (success) {
      updateJob(job);
    }
  };

  const deleteAllJobs = () => {
    if (jobs.length === 0) return;

    Alert.alert(
      "Hapus Semua",
      "Apakah Anda yakin ingin menghapus semua pekerjaan yang tersimpan?",
      [
        { text: "Batal", style: "cancel" },
        {
          text: "Hapus",
          onPress: () => {
            jobs.forEach(job => deleteJobApi(job.id).then(success => {
              if(success) deleteJob(job.id)
            }));
          },
          style: "destructive",
        },
      ]
    );
  };

  return {
    savedJobs: jobs,
    isRefreshing,
    handleRefresh,
    handleNavigateToDetail,
    handleDeleteJob,
    handleUpdateJob,
    deleteAllJobs,
  };
};