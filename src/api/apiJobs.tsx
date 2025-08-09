import { Alert } from 'react-native';
import { Job } from '../types/job';

const BASE_URL = 'https://68878194071f195ca9811034.mockapi.io/api/v1/job';

export const fetchJobs = async (): Promise<Job[]> => {
  const res = await fetch(BASE_URL);
  if (!res.ok) {
    throw new Error('Failed to fetch jobs');
  }
  return res.json();
};

export const fetchJobById = async (id: string): Promise<Job> => {
  const res = await fetch(`${BASE_URL}/${id}`);
    if (!res.ok) {
    throw new Error('Failed to fetch job');
  }
  return res.json();
};

export const deleteJobApi = async (jobId: string) => {
  try {
    const response = await fetch(`${BASE_URL}/${jobId}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      Alert.alert('Sukses', 'Pekerjaan berhasil dihapus.');
      return true;
    } else {
      Alert.alert('Error', 'Gagal menghapus pekerjaan.');
      return false;
    }
  } catch (error) {
    console.error('Error deleting job:', error);
    Alert.alert('Error', 'Terjadi kesalahan. Silakan coba lagi.');
    return false;
  }
};

export const updateJobApi = async (job: Job) => {
  try {
    const response = await fetch(`${BASE_URL}/${job.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(job),
    });

    if (response.ok) {
      Alert.alert('Sukses', 'Pekerjaan berhasil diperbarui.');
      return true;
    } else {
      Alert.alert('Error', 'Gagal memperbarui pekerjaan.');
      return false;
    }
  } catch (error) {
    console.error('Error updating job:', error);
    Alert.alert('Error', 'Terjadi kesalahan. Silakan coba lagi.');
    return false;
  }
};
export const addJob = async (jobData: any) => {
  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(jobData),
    });

    if (response.ok) {
      Alert.alert('Success', 'New job has been added successfully.');
      return await response.json();
    } else {
      const errorData = await response.json();
      Alert.alert('Error', `Failed to add job: ${errorData.message || 'Server error'}`);
      return null;
    }
  } catch (error) {
    console.error('Error adding job:', error);
    Alert.alert('Error', 'An error occurred. Please try again.');
    return null;
  }
};